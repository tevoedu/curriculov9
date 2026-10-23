/* ============================================================
   templates.js — Banco de textos e transformação de linguagem
   Transforma descrições informais em texto profissional.
   Nunca inventa atividades: só reformula o que foi informado.
   ============================================================ */

/* Regras de reformulação de atividades (regex → texto profissional) */
const activityRules = [
    { re: /^(atender|atendia|atendimento|atende).*(cliente|público|pessoa|consumidor)/i, out: "Atendimento ao cliente e ao público" },
    { re: /^(vender|vendia|vendas|vendia|vendi).*/i, out: "Atendimento e vendas de produtos" },
    { re: /^(operar|operava|operação).*(caixa|dinheiro|valores)/i, out: "Operação de caixa e conferência de valores" },
    { re: /^(organizar|organizava|organização|separar|separava).*(documento|documentos|arquivo|arquivos|pasta|pastas)/i, out: "Organização e separação de documentos e arquivos" },
    { re: /^(organizar|organizava|organização|arrumar|arrumava|arrumação|limpar|limpava|limpeza|manter|mantinha).*(loja|setor|ambiente|estoque|mercadoria|produto|gôndola|prateleira|escritório|depósito|salão|cozinha)/i, out: "Organização e limpeza do ambiente de trabalho" },
    { re: /^(repor|repunha|reposição).*(produto|mercadoria|gôndola|prateleira)/i, out: "Reposição e organização de produtos nas prateleiras" },
    { re: /^(conferir|conferia|conferência).*(mercadoria|produto|estoque|pedido|nota|validade|valor)/i, out: "Conferência de mercadorias e produtos" },
    { re: /^(controlar|controlava).*(estoque|mercadoria)/i, out: "Controle e organização de estoque" },
    { re: /^(separar|separava).*(pedido|mercadoria|produto)/i, out: "Separação de pedidos e mercadorias" },
    { re: /^(empacotar|empacotava|embal).*/i, out: "Empacotamento e embalagem de produtos" },
    { re: /^(ajudar|ajudava|auxiliar|auxiliava|apoio).*(cliente|atendimento|clientes)/i, out: "Apoio ao atendimento ao cliente" },
    { re: /^(ajudar|ajudava|auxiliar|auxiliava).*(cozinha|preparo|alimento)/i, out: "Apoio no preparo de alimentos e na organização da cozinha" },
    { re: /^(fazer|fazia|faz).*(caixa|pagamento|cobrança|dinheiro)/i, out: "Atendimento em caixa e processamento de pagamentos" },
    { re: /^(digitar|digitava|digitação).*/i, out: "Digitação e registro de informações" },
    { re: /^(arquivar|arquivava|arquivamento).*/i, out: "Organização e arquivamento de documentos" },
    { re: /^(conferir|conferia|verificar|verificava|checar|checava).*(documento|documentos|dado|dados|formulário|formulários|cadastro|cadastros)/i, out: "Conferência de documentos, cadastros e informações" },
    { re: /^(digitalizar|digitalizava|escanear|escaneava).*(documento|documentos|arquivo|arquivos)/i, out: "Digitalização e organização de documentos" },
    { re: /^(digitar|digitava|preencher|preenchia|atualizar|atualizava).*(formulário|formulários|cadastro|cadastros|documento|documentos|sistema|sistemas)/i, out: "Digitação e atualização de cadastros e informações" },
    { re: /^(atender|atendia).*(telefone|liga)/i, out: "Atendimento telefônico" },
    { re: /^(fazer|fazia|elaborar|elaborava|montar|montava|atualizar|atualizava).*(planilha|excel)/i, out: "Elaboração e atualização de planilhas de controle" },
    { re: /^(receber|recebia).*(mercadoria|produto|cliente|visitante)/i, out: "Recebimento e conferência de itens" },
    { re: /^(manter|mantinha|cuidar|cuidava).*(organizado|limpo|organização)/i, out: "Organização e conservação do ambiente" },
    { re: /^(fazer|fazia|manter|mantinha|atualizar|atualizava).*(redes? social|instagram|facebook|whatsapp)/i, out: "Atualização e gestão de redes sociais e atendimento por WhatsApp" },
    // Equipamentos de informática: combinar somente o que a pessoa realmente informou.
    { re: /^(?=.*(?:montagem|montar|montava))(?=.*(?:manutenção|manutencao|manter|mantinha|consertar|consertava|reparar|reparava))(?=.*(?:formatação|formatacao|formatar|formatava)).*(?:computador|pc|notebook)/i, out: "Montagem, manutenção e formatação de computadores" },
    { re: /^(?=.*(?:montagem|montar|montava))(?=.*(?:manutenção|manutencao|manter|mantinha|consertar|consertava|reparar|reparava)).*(?:computador|pc|notebook)/i, out: "Montagem e manutenção de computadores" },
    { re: /^(?=.*(?:montagem|montar|montava))(?=.*(?:formatação|formatacao|formatar|formatava)).*(?:computador|pc|notebook)/i, out: "Montagem e formatação de computadores" },
    { re: /^(?=.*(?:manutenção|manutencao|manter|mantinha|consertar|consertava|reparar|reparava))(?=.*(?:formatação|formatacao|formatar|formatava)).*(?:computador|pc|notebook)/i, out: "Manutenção e formatação de computadores" },
    { re: /^(montagem|montar|montava).*(computador|pc|notebook)/i, out: "Montagem de computadores" },
    { re: /^(manutenção|manutencao|manter|mantinha|consertar|consertava|reparar|reparava).*(computador|pc|notebook)/i, out: "Manutenção de computadores" },
    { re: /^(formatação|formatacao|formatar|formatava).*(computador|pc|notebook|sistema|windows)/i, out: "Formatação de computadores" },
    { re: /^(instalação|instalacao|instalar|instalava).*(software|programa|sistema|windows)/i, out: "Instalação de softwares e sistemas" },
    { re: /^(ajudar|ajudava|auxiliar|auxiliava).*(minha (mãe|pai|família)|negócio|loja da família|comércio da família)/i, out: "Apoio no comércio da família: atendimento, organização e vendas" },
    { re: /^(entregar|entregava|fazer|fazia).*(entrega|pedido|mercadoria)/i, out: "Realização de entregas e conferência de mercadorias" },
    { re: /^(cuidar|cuidava).*(idoso|criança|pessoa)/i, out: "Cuidados e acompanhamento de pessoas" },
    { re: /^(servir|servia|atender|atendia).*(mesa|cliente|restaurante)/i, out: "Atendimento a clientes e serviço de mesa" }
];

/* Verbos coloquiais → forma profissional no início da frase */
const colloquialFixes = [
    [/^(eu|a gente|agente|nós)\s+/i, ""],
    [/^(meu|minha)\s+(trabalho|função|tarefa)\s+(era|consistia|consistia em)\s+(em\s+)?/i, ""],
    [/^(eu\s+)?(ficava|ficou|estava)\s+(responsável|encarregado)\s+(por|de|em)\s+/i, ""],
    [/^(eu\s+)?(fazia|fiz|faz|faço)\s+(o|a|os|as)?\s*/i, ""],
    [/^(eu\s+)?(ajudava|ajudei|ajudo|auxiliava|auxiliei)\s+(o|a|os|as|meu|minha|na|no|em)?\s*/i, ""],
    [/^(eu\s+)?(era|sou)\s+(responsável|encarregado)\s+(por|de)\s+/i, ""],
    [/^(eu\s+)?(trabalhava|trabalhei|trabalho)\s+(com|em|na|no|de)?\s*/i, ""],
    [/^(eu\s+)?(cuidava|cuidei|cuido)\s+(da|do|das|dos|de)?\s*/i, ""],
    [/^(eu\s+)?(atendia|ati|atendo)\s+/i, "Atendimento a "],
    [/^(eu\s+)?(vendia|vendi|vendo)\s+/i, "Vendas de "]
];

/* Normaliza primeira letra e remove pontuação final duplicada */
function cleanPhrase(p) {
    p = p.trim().replace(/^[\s,;.]+|[\s,;.]+$/g, "");
    if (p.length < 3) return "";
    return p.charAt(0).toUpperCase() + p.slice(1);
}

/* Transforma texto livre em lista de atividades profissionais */
function professionalizeActivities(text) {
    if (!text) return [];
    // Separa atividades por quebra de linha, ponto e vírgula ou ponto final.
    // Vírgulas são mantidas dentro da atividade: em descrições como
    // "placas-mãe, processadores e outros componentes", elas não indicam
    // o início de um novo tópico.
    const raw = text
        .replace(/\r\n?/g, "\n")
        .replace(/(^|\n)\s*[•●▪◦*-]\s*/g, "$1")
        .replace(/(^|\n)\s*\d+[.)]\s*/g, "$1")
        .split(/[;\n]+|\.\s*/)
        .map(s => s.trim())
        .filter(s => s.length > 2);

    const results = [];
    const seen = new Set();

    for (let phrase of raw) {
        let p = phrase.trim();
        // Aplica regras de reconhecimento primeiro
        let matched = false;
        for (const rule of activityRules) {
            if (rule.re.test(p)) {
                const out = rule.out;
                if (!seen.has(out.toLowerCase())) {
                    results.push(out);
                    seen.add(out.toLowerCase());
                }
                matched = true;
                break;
            }
        }
        if (matched) continue;

        // Remove coloquialismos
        for (const [re, rep] of colloquialFixes) {
            p = p.replace(re, rep);
        }
        p = cleanPhrase(p);
        if (p.length < 4) continue;

        // Garante formato substantivo: se começar com verbo comum no infinitivo, mantém;
        // senão apenas capitaliza. Remove duplicatas.
        const key = p.toLowerCase();
        if (!seen.has(key)) {
            results.push(p);
            seen.add(key);
        }
    }
    return results;
}

/* Gera objetivo profissional conforme cargo e perfil */
function generateObjective(state) {
    const role = findRole(state.objective.role);
    const first = state.isFirstJob;
    if (role && role.objectives) {
        const obj = first ? role.objectives.first : role.objectives.experienced;
        if (obj) return obj;
    }
    // Genérico
    const area = state.objective.customRole || "oportunidade de crescimento profissional";
    if (first) {
        return `Busco minha primeira oportunidade profissional, com interesse em desenvolver experiência na área de ${area}, contribuindo com responsabilidade, organização e disposição para aprender.`;
    }
    return `Busco oportunidade na área de ${area}, contribuindo com experiência, dedicação e vontade de crescer profissionalmente.`;
}

/* Gera resumo profissional */
function generateSummary(state) {
    const role = findRole(state.objective.role);
    const first = state.isFirstJob;
    const parts = [];

    if (first) {
        // Monta resumo de primeiro emprego com dados reais
        const edu = (state.education || []).filter(e => e.status !== "trancado");
        const mainEdu = edu.find(e => e.type === "graduacao") || edu.find(e => e.type === "tecnico")
            || edu.find(e => e.type === "medio") || edu[0];
        if (mainEdu) {
            const label = {
                medio: "ensino médio", tecnico: "curso técnico", graduacao: "graduação",
                fundamental: "ensino fundamental", pos: "pós-graduação", outra: "formação complementar"
            }[mainEdu.type] || "formação";
            parts.push(mainEdu.status === "andamento"
                ? `Estudante de ${mainEdu.course || label}`
                : `${label.charAt(0).toUpperCase() + label.slice(1)} ${mainEdu.status === "concluido" ? "concluído" : ""}`.trim());
        }
        const topCourses = (state.courses || []).slice(0, 2).map(c => c.name).filter(Boolean);
        if (topCourses.length) parts.push(`com formação complementar em ${topCourses.join(" e ")}`);
        const interest = role ? `interesse em ${role.title.toLowerCase()}` : "interesse em desenvolvimento profissional";
        if (role && role.summaries && role.summaries.first) {
            // Usa o resumo da biblioteca, mas adapta início se tiver formação
            let s = role.summaries.first;
            if (parts.length >= 2) {
                s = `${parts[0]} ${parts[1]||""}, com ${interest}.`.replace(/\s+/g, " ").trim();
                return s;
            }
            return s;
        }
        return `${parts.join(" ") || "Pessoa dedicada"}, com ${interest} e disposição para aprender.`.replace(/\s+/g, " ").trim();
    }

    // Experiente
    if (role && role.summaries && role.summaries.experienced) {
        let s = role.summaries.experienced;
        // Enriquece com anos de experiência se houver
        const years = estimateExperienceYears(state.experiences || []);
        if (years >= 2 && !role.summaryUsesTransferableExperience) {
            s = `Profissional com ${years} anos de experiência em ${role.title.toLowerCase()}, atuando com ${role.competencies.slice(0, 3).join(", ").toLowerCase()}.`;
        }
        return s;
    }
    return "Profissional dedicado, com experiência e vontade de contribuir com resultados.";
}

/* Estima anos de experiência (aproximado) */
function estimateExperienceYears(experiences) {
    let months = 0;
    const now = new Date();
    for (const e of experiences) {
        if (!e.startYear) continue;
        const start = new Date(e.startYear, (e.startMonth || 1) - 1);
        const end = e.current ? now : (e.endYear ? new Date(e.endYear, (e.endMonth || 12) - 1) : now);
        if (end > start) months += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }
    return Math.round(months / 12);
}

/* Formata período de experiência */
function formatPeriod(e) {
    const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const start = e.startYear ? `${MESES[(e.startMonth || 1) - 1]}/${e.startYear}` : (e.startYear || "");
    if (e.current) return `${start} – atual`;
    const end = e.endYear ? `${MESES[(e.endMonth || 12) - 1]}/${e.endYear}` : "";
    return end ? `${start} – ${end}` : start;
}

/* Formata período de formação */
function formatEducationPeriod(e) {
    if (e.status === "andamento") {
        return e.endYear ? `Previsão de conclusão: ${e.endYear}` : "Em andamento";
    }
    if (e.status === "trancado") return "Trancado";
    return e.endYear ? `Concluído em ${e.endYear}` : "Concluído";
}
