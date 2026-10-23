/* ============================================================
   pdf.js — Exportação A4 independente do tamanho da janela
   ============================================================ */

const Pdf = {
    async download(state) {
        const el = document.getElementById("resume-doc");
        if (!el) {
            alert("Gere o currículo antes de baixar.");
            return;
        }

        const name = (state.profile?.name || "Curriculo")
            .trim()
            .replace(/\s+/g, "_");

        const html2canvasFn = window.html2canvas;
        const JsPDF = window.jspdf?.jsPDF;

        if (!html2canvasFn || !JsPDF) {
            window.print();
            return;
        }

        try {
            if (document.fonts?.ready) await document.fonts.ready;

            /*
             * O erro que fazia o PDF depender da largura da janela vinha de
             * usar a largura atual de #resume-doc. Em tela cheia ele estava
             * dentro de uma coluna estreita; em tela dividida o layout mudava
             * para outra configuração responsiva. A exportação agora usa uma
             * largura A4 fixa e nunca depende da viewport.
             */
            const host = document.createElement("div");
            host.className = "pdf-export-host";
            host.setAttribute("aria-hidden", "true");
            host.style.position = "fixed";
            host.style.left = "-100000px";
            host.style.top = "0";
            host.style.width = "180mm";
            host.style.margin = "0";
            host.style.padding = "0";
            host.style.background = "#ffffff";
            host.style.visibility = "visible";
            host.style.overflow = "visible";
            host.style.zIndex = "-9999";

            const clone = el.cloneNode(true);
            clone.removeAttribute("id");
            clone.classList.add("pdf-export-cv");
            clone.style.width = "180mm";
            clone.style.maxWidth = "180mm";
            clone.style.minWidth = "180mm";
            clone.style.height = "auto";
            clone.style.maxHeight = "none";
            clone.style.overflow = "visible";
            clone.style.boxSizing = "border-box";
            clone.style.fontSize = "11.5pt";
            clone.style.lineHeight = "1.45";
            clone.style.wordBreak = "normal";
            clone.style.overflowWrap = "normal";
            clone.style.wordWrap = "normal";
            clone.style.hyphens = "none";
            clone.style.whiteSpace = "normal";
            clone.style.color = "#000";
            clone.style.background = "#fff";

            clone.querySelectorAll("*").forEach(node => {
                node.style.wordBreak = "normal";
                node.style.overflowWrap = "normal";
                node.style.wordWrap = "normal";
                node.style.hyphens = "none";
                node.style.maxWidth = "100%";
            });

            host.appendChild(clone);
            document.body.appendChild(host);

            /*
             * Deixa o navegador terminar o layout no tamanho A4 antes de
             * medir qualquer coisa. Isso torna o resultado igual em desktop,
             * janela dividida e telas menores.
             */
            void clone.offsetWidth;
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

            const PAGE_W_MM = 210;
            const PAGE_H_MM = 297;
            const MARGIN_X_MM = 15;
            const MARGIN_Y_MM = 15;
            const CONTENT_W_MM = 180;
            const CONTENT_H_MM = 267;
            const CSS_PX_PER_MM = 96 / 25.4;
            const exportWidthPx = Math.round(CONTENT_W_MM * CSS_PX_PER_MM);
            const pageHeightPx = Math.round(CONTENT_H_MM * CSS_PX_PER_MM);

            /*
             * Montamos páginas reais no DOM antes da captura, em vez de
             * cortar um canvas contínuo em posições arbitrárias. Assim uma
             * seção nunca é cortada no meio quando chega ao limite da página.
             */
            const sourceChildren = Array.from(clone.children);
            const pagesHost = document.createElement("div");
            pagesHost.className = "pdf-export-cv";
            pagesHost.style.width = "180mm";
            pagesHost.style.margin = "0";
            pagesHost.style.padding = "0";
            pagesHost.style.background = "#fff";
            pagesHost.style.fontSize = "11.5pt";
            pagesHost.style.lineHeight = "1.45";

            const pageNodes = [];
            let page = makePage();
            let used = 0;

            function makePage() {
                const pageNode = document.createElement("div");
                pageNode.className = "pdf-page";
                pageNode.style.width = "180mm";
                pageNode.style.height = "267mm";
                pageNode.style.boxSizing = "border-box";
                pageNode.style.background = "#fff";
                pageNode.style.overflow = "hidden";
                pageNode.style.position = "relative";
                pageNode.style.display = "flow-root";
                pageNode.style.margin = "0";
                pageNode.style.padding = "0";
                pageNodes.push(pageNode);
                pagesHost.appendChild(pageNode);
                return pageNode;
            }

            /*
             * Mede os blocos exatamente no layout exportado e só move o bloco
             * para a próxima página quando ele não couber. O cabeçalho ocupa
             * espaço apenas na primeira página.
             */
            for (const child of sourceChildren) {
                const rect = child.getBoundingClientRect();
                const cs = getComputedStyle(child);
                const marginTop = parseFloat(cs.marginTop) || 0;
                const marginBottom = parseFloat(cs.marginBottom) || 0;
                const outerHeight = rect.height + marginTop + marginBottom;

                if (used > 0 && used + outerHeight > pageHeightPx) {
                    page = makePage();
                    used = 0;
                }

                page.appendChild(child);
                used += outerHeight;
            }

            /*
             * Se algum bloco isolado for maior que uma página, deixamos o
             * navegador cortá-lo apenas nessa situação extrema. Para um
             * currículo normal, cada seção cabe inteira em uma página.
             */
            host.replaceChild(pagesHost, clone);

            const pdf = new JsPDF({
                unit: "mm",
                format: "a4",
                orientation: "portrait",
                compress: true
            });

            for (let i = 0; i < pageNodes.length; i++) {
                const pageNode = pageNodes[i];
                void pageNode.offsetWidth;
                await new Promise(resolve => requestAnimationFrame(resolve));

                const canvas = await html2canvasFn(pageNode, {
                    backgroundColor: "#ffffff",
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    foreignObjectRendering: false,
                    letterRendering: false,
                    logging: false,
                    imageTimeout: 15000,
                    width: exportWidthPx,
                    height: pageHeightPx,
                    windowWidth: exportWidthPx,
                    windowHeight: pageHeightPx,
                    scrollX: 0,
                    scrollY: 0
                });

                if (!canvas.width || !canvas.height) {
                    throw new Error("A captura do currículo resultou em uma imagem vazia.");
                }

                if (i > 0) pdf.addPage();
                pdf.addImage(
                    canvas.toDataURL("image/png"),
                    "PNG",
                    MARGIN_X_MM,
                    MARGIN_Y_MM,
                    CONTENT_W_MM,
                    CONTENT_H_MM,
                    undefined,
                    "FAST"
                );
            }

            host.remove();
            pdf.save(`Curriculo_${name}.pdf`);
        } catch (error) {
            console.error("Falha ao gerar o PDF:", error);
            document.querySelector(".pdf-export-host")?.remove();
            alert("Não foi possível gerar o PDF automaticamente. Use 'Imprimir / Salvar como PDF' para salvar o currículo.");
            window.print();
        }
    }
};
