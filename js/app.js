/* ============================================================
   app.js — Assistente de criação de currículo (wizard)
   ============================================================ */

const App = (() => {
    let state = defaultState();
    let currentStep = 0;
    let editingExperienceIndex = null;
    let editingEducationIndex = null;
    let editingCourseIndex = null;

    const STEPS = [
        { id: "objetivo", title: "Objetivo", subtitle: "O que você está procurando?" },
        { id: "perfil", title: "Perfil", subtitle: "Seus dados de contato" },
        { id: "formacao", title: "Formação", subtitle: "Sua escolaridade" },
        { id: "experiencia", title: "Experiência", subtitle: "Onde você já trabalhou" },
        { id: "cursos", title: "Cursos", subtitle: "Cursos e certificações" },
        { id: "competencias", title: "Competências", subtitle: "O que você sabe fazer" },
        { id: "idiomas", title: "Idiomas", subtitle: "Idiomas que você conhece" },
        { id: "adicional", title: "Informações adicionais", subtitle: "Detalhes que podem ajudar" },
        { id: "revisao", title: "Revisão", subtitle: "Confira antes de finalizar" },
        { id: "pronto", title: "Currículo pronto", subtitle: "Seu currículo está pronto" }
    ];

    function defaultState() {
        return {
            step: 0,
            isFirstJob: null,
            objective: { type: "", role: "", subarea: "", customRole: "", customObjective: "", customSummary: "" },
            profile: { name: "", city: localMarket.city, uf: localMarket.state, phone: "", email: "", linkedin: "", github: "", portfolio: "" },
            education: [],
            experiences: [],
            practicalExperiences: [],
            courses: [],
            languages: [],
            techSkills: [],
            behavioralSkills: [],
            additional: { cnh: "", availability: "", willingToTravel: false, pcd: "", registry: "" },
            behavioralAnswers: []
        };
    }

    /* ---------- Inicialização ---------- */
    function init() {
        bindGlobal();
        const saved = Storage.load();
        if (saved && (saved.profile.name || saved.objective.role || saved.step > 0)) {
            showResumePrompt(saved);
        } else {
            renderLanding();
        }
        applyTheme();
    }

    function showResumePrompt(saved) {
        const when = Storage.savedAt();
        const dateStr = when ? new Date(when).toLocaleDateString("pt-BR") : "";
        render(`
            <div class="resume-prompt card">
                <h2>Encontramos um currículo que você começou${dateStr ? ` em ${dateStr}` : ""}.</h2>
                <p>Deseja continuar de onde parou ou começar um novo?</p>
                <div class="prompt-actions">
                    <button class="btn btn-primary" id="btn-continue">Continuar</button>
                    <button class="btn btn-outline" id="btn-new">Começar novo</button>
                </div>
            </div>
            <p class="privacy-note">🔒 Seus dados ficam neste navegador. Nada é enviado para servidores.</p>
        `);
        document.getElementById("btn-continue").onclick = () => {
            state = Object.assign(defaultState(), saved);
            currentStep = Math.min(state.step || 0, STEPS.length - 1);
            renderStep();
        };
        document.getElementById("btn-new").onclick = () => {
            if (confirm("Isso apagará os dados salvos. Tem certeza?")) {
                Storage.clear();
                state = defaultState();
                renderStep();
            }
        };
    }

    function renderLanding() {
        render(`
        <section class="landing">
            <div class="landing-hero">
                <span class="badge">Gratuito · Funciona offline · Sem cadastro</span>
                <h1>Crie seu currículo profissional em poucos minutos.</h1>
                <p class="landing-sub">Respondendo perguntas simples, o assistente monta automaticamente um currículo claro, moderno e compatível com sistemas de seleção (ATS).</p>
                <button class="btn btn-primary btn-lg" id="btn-start">Começar meu currículo</button>
                <p class="privacy-note">🔒 Seus dados ficam neste navegador. Nada é enviado para servidores.</p>
            </div>
            <div class="landing-grid">
                <div class="feature"><span class="feature-icon">🎯</span><h3>Primeiro emprego</h3><p>Sem experiência? Transformamos projetos, cursos e atividades em um currículo forte.</p></div>
                <div class="feature"><span class="feature-icon">💼</span><h3>Experiência profissional</h3><p>Descreva do seu jeito — reescrevemos em linguagem profissional.</p></div>
                <div class="feature"><span class="feature-icon">📚</span><h3>Modelos por profissão</h3><p>Adaptado para atendimento, vendas, administrativo, operacional e tecnologia.</p></div>
                <div class="feature"><span class="feature-icon">⚡</span><h3>Otimização</h3><p>Sugestões automáticas para deixar o currículo mais objetivo para cada vaga.</p></div>
                <div class="feature"><span class="feature-icon">👁️</span><h3>Prévia em tempo real</h3><p>Veja o currículo sendo montado enquanto responde.</p></div>
                <div class="feature"><span class="feature-icon">📄</span><h3>PDF em A4</h3><p>Baixe em PDF pronto para enviar, ou imprima direto.</p></div>
            </div>
        </section>`);
        document.getElementById("btn-start").onclick = () => { currentStep = 0; renderStep(); };
    }

    /* ---------- Shell do assistente ---------- */
    function render(html) {
        document.getElementById("app").innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderStep() {
        state.step = currentStep;
        Storage.save(state);
        const step = STEPS[currentStep];
        const body = stepBodies[step.id] ? stepBodies[step.id]() : "";
        render(`
            <div class="wizard">
                <aside class="wizard-side">
                    <div class="wizard-progress">
                        <div class="progress-track"><div class="progress-bar" style="width:${(currentStep / (STEPS.length - 1)) * 100}%"></div></div>
                        <ol class="step-list">
                            ${STEPS.map((s, i) => `<li class="${i === currentStep ? "active" : i < currentStep ? "done" : ""}">
                                <span class="step-num">${i < currentStep ? "✓" : String(i + 1).padStart(2, "0")}</span> ${s.title}
                            </li>`).join("")}
                        </ol>
                    </div>
                    <div class="wizard-actions-side">
                        ${currentStep > 0 ? `<button class="btn btn-ghost" id="btn-back">← Voltar</button>` : `<button class="btn btn-ghost" id="btn-home">← Início</button>`}
                        <button class="btn btn-ghost btn-danger" id="btn-clear">Limpar meus dados</button>
                    </div>
                </aside>
                <main class="wizard-main">
                    <header class="step-header">
                        <h2>${step.title}</h2>
                        <p>${step.subtitle}</p>
                    </header>
                    <div class="step-body">${body}</div>
                    <footer class="step-footer" id="step-footer"></footer>
                </main>
                <aside class="wizard-preview">
                    <div class="preview-header">
                        <span>Prévia do currículo</span>
                        <button class="btn btn-ghost btn-sm" id="btn-toggle-preview" aria-label="Alternar prévia">👁️</button>
                    </div>
                    <div class="preview-paper" id="preview">${renderResume(state)}</div>
                </aside>
            </div>`);
        bindStepCommon();
        if (stepBindings[step.id]) stepBindings[step.id]();
        renderFooter(step.id);
        updatePreview();
    }

    function renderFooter(stepId) {
        const footer = document.getElementById("step-footer");
        if (!footer) return;
        if (stepId === "pronto") { footer.innerHTML = ""; return; }
        const isLast = currentStep === STEPS.length - 2;
        footer.innerHTML = `
            <button class="btn btn-primary btn-lg" id="btn-next">${isLast ? "Ver currículo pronto →" : "Avançar →"}</button>
            ${currentStep > 0 ? `<button class="btn btn-outline" id="btn-back-bottom">← Voltar</button>` : ""}`;
        footer.querySelector("#btn-next").onclick = () => next();
        const bb = footer.querySelector("#btn-back-bottom");
        if (bb) bb.onclick = () => back();
    }

    function bindStepCommon() {
        const back = document.getElementById("btn-back");
        if (back) back.onclick = () => back2();
        const home = document.getElementById("btn-home");
        if (home) home.onclick = () => { Storage.save(state); renderLanding(); };
        const clear = document.getElementById("btn-clear");
        if (clear) clear.onclick = () => {
            if (confirm("Tem certeza? Isso apagará todos os seus dados salvos neste navegador.")) {
                Storage.clear();
                state = defaultState();
                currentStep = 0;
                renderStep();
            }
        };
        const toggle = document.getElementById("btn-toggle-preview");
        if (toggle) toggle.onclick = () => document.querySelector(".wizard-preview").classList.toggle("collapsed");
        // Atualização automática ao digitar
        document.querySelectorAll("[data-bind]").forEach(el => {
            el.addEventListener("input", () => {
                setPath(state, el.dataset.bind, el.value);
                Storage.save(state);
                updatePreview();
            });
            el.addEventListener("change", () => {
                setPath(state, el.dataset.bind, el.value);
                Storage.save(state);
                updatePreview();
            });
        });
    }

    function back2() { if (currentStep > 0) { currentStep--; renderStep(); } }
    function back() { back2(); }

    function next() {
        if (validators[STEPS[currentStep].id] && !validators[STEPS[currentStep].id]()) return;
        if (currentStep < STEPS.length - 1) { currentStep++; renderStep(); }
    }

    function updatePreview() {
        const el = document.getElementById("preview");
        if (el) el.innerHTML = renderResume(state);
    }

    function setPath(obj, path, value) {
        const keys = path.split(".");
        let o = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (o[keys[i]] == null) o[keys[i]] = {};
            o = o[keys[i]];
        }
        o[keys[keys.length - 1]] = value;
    }

    function fieldError(id, msg) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add("input-error");
        let err = el.parentElement.querySelector(".field-error");
        if (!err) {
            err = document.createElement("span");
            err.className = "field-error";
            el.parentElement.appendChild(err);
        }
        err.textContent = msg;
        el.focus();
    }
    function clearErrors() {
        document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
        document.querySelectorAll(".field-error").forEach(e => e.remove());
    }

    /* ---------- Etapas ---------- */
    const OBJECTIVE_TYPES = [
        { id: "primeiro-emprego", label: "Primeiro emprego", desc: "Ainda não trabalhei formalmente" },
        { id: "jovem-aprendiz", label: "Jovem Aprendiz", desc: "Vaga de aprendizagem para estudantes" },
        { id: "estagio", label: "Estágio", desc: "Estágio para estudantes" },
        { id: "efetivo", label: "Emprego efetivo (CLT)", desc: "Tenho ou quero experiência formal" },
        { id: "administrativo", label: "Trabalho administrativo", desc: "Escritório, documentos, rotinas" },
        { id: "atendimento", label: "Atendimento ao público", desc: "Lojas, recepção, telefone" },
        { id: "vendas", label: "Vendas e comércio", desc: "Loja, vendas, caixa" },
        { id: "operacional", label: "Área operacional", desc: "Estoque, produção, serviços gerais" },
        { id: "tecnologia", label: "Tecnologia / Informática", desc: "Suporte, manutenção, programação" },
        { id: "outra", label: "Outra / Profissão específica", desc: "Escolha um cargo na lista" }
    ];

    const stepBodies = {
        objetivo() {
            const grouped = {};
            roleLibrary.forEach(r => { (grouped[r.category] = grouped[r.category] || []).push(r); });
            return `
                <div class="card">
                    <h3 class="card-title">O que você está procurando?</h3>
                    <div class="option-grid" id="obj-types">
                        ${OBJECTIVE_TYPES.map(t => `
                            <button class="option-card ${state.objective.type === t.id ? "selected" : ""}" data-type="${t.id}">
                                <strong>${t.label}</strong><span>${t.desc}</span>
                            </button>`).join("")}
                    </div>
                </div>
                <div class="card" id="role-card" style="display:${state.objective.type ? "block" : "none"}">
                    <h3 class="card-title">Para qual cargo?</h3>
                    <p class="hint">Escolha o cargo mais próximo do que você procura — o currículo será adaptado para ele.</p>
                    ${Object.entries(grouped).map(([cat, roles]) => `
                        <h4 class="role-cat">${cat}</h4>
                        <div class="role-grid">
                            ${roles.map(r => `<button class="role-chip ${state.objective.role === r.id ? "selected" : ""}" data-role="${r.id}">${r.title}</button>`).join("")}
                        </div>`).join("")}
                    <div class="custom-role">
                        <label for="custom-role">Outro cargo (escreva)</label>
                        <input type="text" id="custom-role" data-bind="objective.customRole" value="${esc(state.objective.customRole || "")}" placeholder="Ex.: Auxiliar de cozinha, Costureira...">
                    </div>
                    <div id="subarea-wrap"></div>
                </div>`;
        },

        perfil() {
            const p = state.profile;
            const role = findRole(state.objective.role);
            const showTechLinks = role && (role.category === "Tecnologia" || role.links);
            return `
            <div class="card">
                <h3 class="card-title">Dados para contato</h3>
                <p class="hint">Esses são os dados que as empresas usam para chamar você. CPF, RG e endereço completo <strong>não</strong> vão no currículo.</p>
                <div class="form-grid">
                    <div class="field span-2">
                        <label for="f-name">Nome completo *</label>
                        <input id="f-name" data-bind="profile.name" value="${esc(p.name)}" placeholder="Ex.: João da Silva" autocomplete="name">
                    </div>
                    <div class="field">
                        <label for="f-city">Cidade *</label>
                        <input id="f-city" data-bind="profile.city" value="${esc(p.city)}" placeholder="Iguatu">
                    </div>
                    <div class="field">
                        <label for="f-uf">UF *</label>
                        <input id="f-uf" data-bind="profile.uf" value="${esc(p.uf)}" maxlength="2" placeholder="CE">
                    </div>
                    <div class="field">
                        <label for="f-phone">Telefone / WhatsApp *</label>
                        <input id="f-phone" data-bind="profile.phone" value="${esc(p.phone)}" placeholder="(88) 99999-9999" inputmode="tel" autocomplete="tel">
                    </div>
                    <div class="field">
                        <label for="f-email">E-mail *</label>
                        <input id="f-email" type="email" data-bind="profile.email" value="${esc(p.email)}" placeholder="seunome@email.com" autocomplete="email">
                    </div>
                    <div class="field">
                        <label for="f-linkedin">LinkedIn <span class="optional">(opcional)</span></label>
                        <input id="f-linkedin" data-bind="profile.linkedin" value="${esc(p.linkedin)}" placeholder="linkedin.com/in/seunome">
                    </div>
                    ${showTechLinks ? `
                    <div class="field">
                        <label for="f-github">GitHub <span class="optional">(recomendado para tecnologia)</span></label>
                        <input id="f-github" data-bind="profile.github" value="${esc(p.github)}" placeholder="github.com/seunome">
                    </div>
                    <div class="field">
                        <label for="f-portfolio">Portfólio / Site <span class="optional">(opcional)</span></label>
                        <input id="f-portfolio" data-bind="profile.portfolio" value="${esc(p.portfolio)}" placeholder="seusite.com.br">
                    </div>` : ""}
                </div>
            </div>`;
        },

        formacao() {
            const list = state.education.map((e, i) => `
                <div class="list-item">
                    <div><strong>${esc(educationLabel(e.type))}${e.course ? ` em ${esc(e.course)}` : ""}</strong>
                    <span>${esc(e.institution || "")}${e.city ? ` — ${esc(e.city)}` : ""} · ${esc(formatEducationPeriod(e))}</span></div>
                    <div class="list-item-actions">
                        <button class="btn btn-ghost btn-sm" data-edit-edu="${i}">Editar</button>
                        <button class="btn btn-ghost btn-sm btn-danger" data-del-edu="${i}">Remover</button>
                    </div>
                </div>`).join("");
            return `
            <div class="card">
                <h3 class="card-title">Sua formação</h3>
                <p class="hint">Ensino médio, técnico, faculdade... Adicione quantas quiser, da mais importante para a vaga primeiro.</p>
                <div id="edu-list">${list || `<p class="empty">Nenhuma formação adicionada ainda.</p>`}</div>
                <div id="edu-form" style="display:none">
                    <div class="form-grid">
                        <div class="field">
                            <label for="edu-type">Tipo *</label>
                            <select id="edu-type">
                                <option value="">Selecione</option>
                                <option value="medio">Ensino Médio</option>
                                <option value="tecnico">Curso Técnico</option>
                                <option value="graduacao">Graduação</option>
                                <option value="pos">Pós-graduação</option>
                                <option value="fundamental">Ensino Fundamental</option>
                                <option value="outra">Outra</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="edu-course">Curso (se técnico/faculdade)</label>
                            <input id="edu-course" placeholder="Ex.: Informática, Administração">
                        </div>
                        <div class="field">
                            <label for="edu-inst">Instituição *</label>
                            <input id="edu-inst" placeholder="Ex.: Escola Estadual..., EEEP...">
                        </div>
                        <div class="field">
                            <label for="edu-city">Cidade</label>
                            <input id="edu-city" placeholder="Iguatu">
                        </div>
                        <div class="field">
                            <label for="edu-status">Status *</label>
                            <select id="edu-status">
                                <option value="concluido">Concluído</option>
                                <option value="andamento">Em andamento</option>
                                <option value="trancado">Trancado</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="edu-end">Ano de conclusão / previsão</label>
                            <input id="edu-end" inputmode="numeric" maxlength="4" placeholder="2024">
                        </div>
                    </div>
                    <div class="inline-actions">
                        <button class="btn btn-primary" id="edu-save">Salvar formação</button>
                        <button class="btn btn-ghost" id="edu-cancel">Cancelar</button>
                    </div>
                </div>
                <button class="btn btn-outline" id="edu-add">+ Adicionar formação</button>
            </div>`;
        },

        experiencia() {
            const first = state.isFirstJob;
            const list = state.experiences.map((e, i) => `
                <div class="list-item">
                    <div><strong>${esc(e.role)}</strong> — ${esc(e.company)}<br>
                    <span>${esc(formatPeriod(e))}${e.contractType ? ` · ${esc(contractLabel(e.contractType))}` : ""}</span></div>
                    <div class="list-item-actions">
                        <button class="btn btn-ghost btn-sm" data-edit-exp="${i}">Editar</button>
                        <button class="btn btn-ghost btn-sm btn-danger" data-del-exp="${i}">Remover</button>
                    </div>
                </div>`).join("");
            const plist = state.practicalExperiences.map((p, i) => `
                <div class="list-item">
                    <div><strong>${esc(practicalLabel(p.type))}</strong><br><span>${esc(p.description)}</span></div>
                    <div class="list-item-actions">
                        <button class="btn btn-ghost btn-sm" data-edit-prac="${i}">Editar</button>
                        <button class="btn btn-ghost btn-sm btn-danger" data-del-prac="${i}">Remover</button>
                    </div>
                </div>`).join("");

            if (state.isFirstJob === null) {
                return `
                <div class="card">
                    <h3 class="card-title">Você já trabalhou?</h3>
                    <p class="hint">Inclua trabalhos formais (com carteira), estágios, aprendizagem e também experiências informais.</p>
                    <div class="option-grid two">
                        <button class="option-card" id="worked-yes"><strong>Sim, já trabalhei</strong><span>Tenho experiência formal ou informal</span></button>
                        <button class="option-card" id="worked-no"><strong>Não, é meu primeiro emprego</strong><span>Ainda não trabalhei</span></button>
                    </div>
                    <p class="info-box">💡 Experiências informais contam! Ajudar no comércio da família, freelas, projetos escolares e voluntariado podem ser descritos de forma profissional.</p>
                </div>`;
            }

            if (first) {
                return `
                <div class="card">
                    <div class="firstjob-banner">
                        <h3>🌱 Modo primeiro emprego</h3>
                        <p>Você não precisa ter experiência profissional para criar um bom currículo. Vamos destacar seus pontos fortes: cursos, projetos, voluntariado e atividades práticas.</p>
                    </div>
                    <h3 class="card-title">Experiências práticas</h3>
                    <p class="hint">Já fez estágio, aprendizagem, voluntariado, projeto escolar, ajudou em negócio da família ou trabalhou informalmente?</p>
                    <div id="prac-list">${plist || `<p class="empty">Nenhuma experiência prática adicionada. Se não tiver nenhuma, tudo bem — seus cursos e competências já são um bom começo.</p>`}</div>
                    <div id="prac-form" style="display:none">
                        <div class="form-grid">
                            <div class="field">
                                <label for="prac-type">Tipo *</label>
                                <select id="prac-type">
                                    <option value="">Selecione</option>
                                    <option value="estagio">Estágio</option>
                                    <option value="aprendiz">Jovem Aprendiz</option>
                                    <option value="voluntariado">Voluntariado</option>
                                    <option value="escolar">Projeto escolar</option>
                                    <option value="pessoal">Projeto pessoal</option>
                                    <option value="informal">Trabalho informal</option>
                                    <option value="familiar">Negócio da família</option>
                                    <option value="freelancer">Trabalho freelancer</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="prac-org">Onde / com quem</label>
                                <input id="prac-org" placeholder="Ex.: Loja da família, escola, igreja...">
                            </div>
                            <div class="field">
                                <label for="prac-period">Período</label>
                                <input id="prac-period" placeholder="Ex.: 2024 – 2025">
                            </div>
                        </div>
                        <div class="field">
                            <label for="prac-desc">O que você fazia? *</label>
                            <textarea id="prac-desc" rows="3" placeholder="Ex.: Atendia clientes e organizava a loja no fim de semana"></textarea>
                            <p class="hint">Escreva do seu jeito — nós transformamos em linguagem profissional.</p>
                        </div>
                        <div class="inline-actions">
                            <button class="btn btn-primary" id="prac-save">Salvar</button>
                            <button class="btn btn-ghost" id="prac-cancel">Cancelar</button>
                        </div>
                    </div>
                    <button class="btn btn-outline" id="prac-add">+ Adicionar experiência prática</button>
                    <div class="inline-actions" style="margin-top:16px">
                        <button class="btn btn-ghost" id="switch-experienced">Na verdade, já trabalhei →</button>
                    </div>
                </div>`;
            }

            return `
            <div class="card">
                <h3 class="card-title">Experiências profissionais</h3>
                <div id="exp-list">${list || `<p class="empty">Nenhuma experiência adicionada.</p>`}</div>
                <div id="exp-form" style="display:none">
                    <div class="form-grid">
                        <div class="field">
                            <label for="exp-role">Cargo *</label>
                            <input id="exp-role" list="role-options" placeholder="Ex.: Atendente, Auxiliar administrativo...">
                            <datalist id="role-options">${roleLibrary.map(r => `<option value="${esc(r.title)}">`).join("")}</datalist>
                        </div>
                        <div class="field">
                            <label for="exp-company">Empresa *</label>
                            <input id="exp-company" placeholder="Nome da empresa">
                        </div>
                        <div class="field">
                            <label for="exp-city">Cidade/UF</label>
                            <input id="exp-city" placeholder="Iguatu/CE">
                        </div>
                        <div class="field">
                            <label for="exp-contract">Tipo de vínculo</label>
                            <select id="exp-contract">
                                <option value="clt">CLT</option>
                                <option value="estagio">Estágio</option>
                                <option value="aprendiz">Jovem Aprendiz</option>
                                <option value="temporario">Temporário</option>
                                <option value="informal">Informal</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="autonomo">Autônomo</option>
                                <option value="familiar">Trabalho familiar</option>
                                <option value="voluntariado">Voluntariado</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="exp-start-m">Início *</label>
                            <div class="dual-input">
                                <select id="exp-start-m">${monthOptions()}</select>
                                <input id="exp-start-y" inputmode="numeric" maxlength="4" placeholder="Ano">
                            </div>
                        </div>
                        <div class="field">
                            <label for="exp-end-m">Término</label>
                            <div class="dual-input">
                                <select id="exp-end-m">${monthOptions()}</select>
                                <input id="exp-end-y" inputmode="numeric" maxlength="4" placeholder="Ano">
                            </div>
                        </div>
                        <div class="field span-2 checkbox-field">
                            <label class="checkbox"><input type="checkbox" id="exp-current"> Trabalho atualmente aqui</label>
                        </div>
                        <div class="field span-2">
                            <label for="exp-activities">Principais atividades *</label>
                            <textarea id="exp-activities" rows="3" placeholder="Ex.: Atendia clientes, organizava a loja e repunha produtos"></textarea>
                            <p class="hint">Digite uma atividade por linha ou separe com ponto e vírgula. Vírgulas dentro da mesma atividade serão preservadas. Nós reescrevemos em linguagem profissional.</p>
                        </div>
                        <div class="field span-2">
                            <label for="exp-results">Resultados ou conquistas <span class="optional">(opcional)</span></label>
                            <textarea id="exp-results" rows="2" placeholder="Ex.: Fui elogiado pelo atendimento..."></textarea>
                        </div>
                    </div>
                    <div class="inline-actions">
                        <button class="btn btn-primary" id="exp-save">Salvar experiência</button>
                        <button class="btn btn-ghost" id="exp-cancel">Cancelar</button>
                    </div>
                </div>
                <button class="btn btn-outline" id="exp-add">+ Adicionar experiência</button>
            </div>`;
        },

        cursos() {
            const suggested = getSuggestedCourses(state.objective.role);
            const list = state.courses.map((c, i) => `
                <div class="list-item">
                    <div><strong>${esc(c.name)}</strong><span>${esc(c.institution || "")}${c.hours ? ` · ${esc(c.hours)}h` : ""}${c.year ? ` · ${esc(c.year)}` : ""}</span></div>
                    <div class="list-item-actions">
                        <button class="btn btn-ghost btn-sm" data-edit-course="${i}">Editar</button>
                        <button class="btn btn-ghost btn-sm btn-danger" data-del-course="${i}">Remover</button>
                    </div>
                </div>`).join("");
            return `
            <div class="card">
                <h3 class="card-title">Cursos e certificações</h3>
                ${suggested.length ? `<p class="hint">Sugestões para <strong>${esc(findRole(state.objective.role)?.title || "seu objetivo")}</strong> — adicione ao currículo somente cursos que você realmente concluiu: ${suggested.map(s => `<button class="chip chip-suggest" data-suggest-course="${esc(s)}">+ ${esc(s)}</button>`).join(" ")}</p>` : ""}
                <div id="course-list">${list || `<p class="empty">Nenhum curso adicionado.</p>`}</div>
                <div id="course-form" style="display:none">
                    <div class="form-grid">
                        <div class="field span-2">
                            <label for="course-name">Nome do curso *</label>
                            <input id="course-name" placeholder="Ex.: Excel Básico e Intermediário">
                        </div>
                        <div class="field">
                            <label for="course-inst">Instituição</label>
                            <input id="course-inst" placeholder="Ex.: SENAI, Sesc...">
                        </div>
                        <div class="field">
                            <label for="course-hours">Carga horária (horas)</label>
                            <input id="course-hours" inputmode="numeric" placeholder="40">
                        </div>
                        <div class="field">
                            <label for="course-year">Ano</label>
                            <input id="course-year" inputmode="numeric" maxlength="4" placeholder="2024">
                        </div>
                        <div class="field">
                            <label for="course-mod">Modalidade</label>
                            <select id="course-mod">
                                <option value="">—</option>
                                <option>Presencial</option>
                                <option>Online</option>
                                <option>Híbrido</option>
                            </select>
                        </div>
                    </div>
                    <div class="inline-actions">
                        <button class="btn btn-primary" id="course-save">Salvar curso</button>
                        <button class="btn btn-ghost" id="course-cancel">Cancelar</button>
                    </div>
                </div>
                <button class="btn btn-outline" id="course-add">+ Adicionar curso</button>
            </div>`;
        },

        competencias() {
            const role = findRole(state.objective.role);
            const roleSkills = role ? role.competencies : [];
            const allSelected = [...state.techSkills, ...state.behavioralSkills];
            return `
            <div class="card">
                <h3 class="card-title">O que você sabe fazer?</h3>
                <p class="hint">Selecione suas competências. No final, priorizamos as mais relevantes para ${esc(role ? role.title : "o cargo escolhido")}.</p>
                ${roleSkills.length ? `<h4 class="role-cat">Relevantes para ${esc(role.title)}</h4>
                <div class="skill-cloud" id="role-skills">
                    ${roleSkills.map(s => `<button class="chip ${allSelected.includes(s) ? "chip-on" : ""}" data-skill="${esc(s)}">${esc(s)}</button>`).join("")}
                </div>` : ""}
                <h4 class="role-cat">Competências técnicas</h4>
                <div class="skill-cloud" id="tech-skills">
                    ${technicalSkills.map(s => `<button class="chip ${state.techSkills.includes(s) ? "chip-on" : ""}" data-tech="${esc(s)}">${esc(s)}</button>`).join("")}
                </div>
                <div class="field" style="margin-top:12px">
                    <label for="skill-custom">Adicionar outra competência</label>
                    <input id="skill-custom" list="skill-options" placeholder="Digite e pressione Enter">
                    <datalist id="skill-options">${technicalSkills.concat(behavioralSkills).map(s => `<option value="${esc(s)}">`).join("")}</datalist>
                </div>
                <div id="custom-skills" class="skill-cloud">
                    ${state.techSkills.filter(s => !technicalSkills.includes(s)).map(s => `<button class="chip chip-on" data-tech="${esc(s)}">${esc(s)} ✕</button>`).join("")}
                    ${state.behavioralSkills.filter(s => !roleSkills.includes(s)).map(s => `<button class="chip chip-on chip-behavior" data-beh="${esc(s)}">${esc(s)} ✕</button>`).join("")}
                </div>
            </div>
            <div class="card">
                <h3 class="card-title">Sobre você no trabalho</h3>
                <p class="hint">Responda como você age de verdade. Usamos as respostas para sugerir competências comportamentais — você pode remover qualquer uma depois.</p>
                ${situationalQuestions.map((q, qi) => `
                    <div class="situational" data-q="${qi}">
                        <p class="situational-q">${esc(q.question)}</p>
                        <div class="option-grid">
                            ${q.options.map((o, oi) => `<button class="option-card small ${(state.behavioralAnswers[qi] === oi) ? "selected" : ""}" data-sq="${qi}" data-so="${oi}"><span>${esc(o.label)}</span></button>`).join("")}
                        </div>
                    </div>`).join("")}
            </div>`;
        },

        idiomas() {
            const list = state.languages.map((l, i) => `
                <div class="list-item">
                    <div><strong>${esc(l.name)}</strong> — ${esc(levelLabel(l.level))}</div>
                    <div class="list-item-actions"><button class="btn btn-ghost btn-sm btn-danger" data-del-lang="${i}">Remover</button></div>
                </div>`).join("");
            return `
            <div class="card">
                <h3 class="card-title">Idiomas</h3>
                <p class="hint">Português não precisa ser listado — é considerado padrão no Brasil.</p>
                <div id="lang-list">${list || `<p class="empty">Nenhum idioma adicionado.</p>`}</div>
                <div class="form-grid">
                    <div class="field">
                        <label for="lang-name">Idioma</label>
                        <select id="lang-name">
                            <option value="">Selecione</option>
                            <option>Inglês</option>
                            <option>Espanhol</option>
                            <option>Francês</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div class="field">
                        <label for="lang-level">Nível</label>
                        <select id="lang-level">
                            <option value="basico">Básico</option>
                            <option value="intermediario">Intermediário</option>
                            <option value="avancado">Avançado</option>
                            <option value="fluente">Fluente</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-outline" id="lang-add">+ Adicionar idioma</button>
                ${state.languages.length === 0 ? `<p class="hint" style="margin-top:10px">Não fala outro idioma? Sem problemas — pule esta etapa.</p>` : ""}
            </div>`;
        },

        adicional() {
            return `
            <div class="card">
                <h3 class="card-title">Informações que podem ajudar</h3>
                <p class="hint">Só incluímos no currículo o que for relevante para a vaga.</p>
                <div class="form-grid">
                    <div class="field">
                        <label for="add-cnh">CNH <span class="optional">(opcional)</span></label>
                        <select id="add-cnh" data-bind="additional.cnh">
                            <option value="">Não tenho / não informar</option>
                            ${["A", "B", "AB", "C", "D", "E"].map(c => `<option ${state.additional.cnh === c ? "selected" : ""}>${c}</option>`).join("")}
                        </select>
                    </div>
                    <div class="field">
                        <label for="add-avail">Disponibilidade <span class="optional">(opcional)</span></label>
                        <select id="add-avail" data-bind="additional.availability">
                            <option value="">—</option>
                            ${["Manhã", "Tarde", "Noite", "Manhã e tarde", "Integral", "Fins de semana"].map(a => `<option ${state.additional.availability === a ? "selected" : ""}>${a}</option>`).join("")}
                        </select>
                    </div>
                    <div class="field span-2 checkbox-field">
                        <label class="checkbox"><input type="checkbox" id="add-travel" ${state.additional.willingToTravel ? "checked" : ""}> Disponibilidade para viagens</label>
                    </div>
                    <div class="field">
                        <label for="add-pcd">Você é pessoa com deficiência (PcD)? <span class="optional">(opcional)</span></label>
                        <select id="add-pcd" data-bind="additional.pcd">
                            <option value="">Prefiro não informar</option>
                            <option value="sim" ${state.additional.pcd === "sim" ? "selected" : ""}>Sim</option>
                            <option value="nao" ${state.additional.pcd === "nao" ? "selected" : ""}>Não</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card">
                <h3 class="card-title">Objetivo e resumo</h3>
                <p class="hint">Geramos automaticamente com base no seu perfil. Edite se quiser personalizar.</p>
                <div class="field">
                    <label for="obj-text">Objetivo profissional</label>
                    <textarea id="obj-text" rows="3" data-bind="objective.customObjective" placeholder="${esc(generateObjective(state))}">${esc(state.objective.customObjective || "")}</textarea>
                    <p class="hint">Sugestão automática: <em>${esc(generateObjective(state))}</em></p>
                </div>
                <div class="field">
                    <label for="sum-text">Resumo profissional</label>
                    <textarea id="sum-text" rows="3" data-bind="objective.customSummary" placeholder="${esc(generateSummary(state))}">${esc(state.objective.customSummary || "")}</textarea>
                    <p class="hint">Sugestão automática: <em>${esc(generateSummary(state))}</em></p>
                </div>
            </div>`;
        },

        revisao() {
            const diag = diagnoseResume(state);
            const objLabel = OBJECTIVE_TYPES.find(t => t.id === state.objective.type)?.label || "";
            const roleLabel = findRole(state.objective.role)?.title || state.objective.customRole || "—";
            return `
            <div class="card">
                <h3 class="card-title">Diagnóstico do currículo</h3>
                <ul class="diag-list">
                    ${diag.checks.map(c => `<li class="${c.ok ? "ok" : "warn"}">${c.ok ? "✓" : "⚠"} ${c.label}${c.ok ? "" : ` — <span class="diag-hint">${c.hint}</span>`}</li>`).join("")}
                </ul>
                ${diag.recommendations.length ? `<h4 class="role-cat">Recomendações</h4><ul class="diag-list">${diag.recommendations.map(r => `<li class="tip">💡 ${r}</li>`).join("")}</ul>` : ""}
            </div>
            <div class="card">
                <h3 class="card-title">Revisão dos dados</h3>
                <div class="review-grid">
                    <div><strong>Nome:</strong> ${esc(state.profile.name) || "—"}</div>
                    <div><strong>Contato:</strong> ${esc(state.profile.phone)} · ${esc(state.profile.email)}</div>
                    <div><strong>Local:</strong> ${esc(state.profile.city)}/${esc(state.profile.uf)}</div>
                    <div><strong>Objetivo:</strong> ${esc(objLabel)} — ${esc(roleLabel)}</div>
                    <div><strong>Formação:</strong> ${state.education.length} item(ns)</div>
                    <div><strong>${state.isFirstJob ? "Experiências práticas" : "Experiências"}:</strong> ${state.isFirstJob ? state.practicalExperiences.length : state.experiences.length} item(ns)</div>
                    <div><strong>Cursos:</strong> ${state.courses.length}</div>
                    <div><strong>Competências:</strong> ${state.techSkills.length + state.behavioralSkills.length}</div>
                </div>
                <p class="hint" style="margin-top:12px">Para corrigir algo, clique em uma etapa ao lado ou use <strong>Voltar</strong>.</p>
                <div class="inline-actions">
                    <button class="btn btn-outline" id="btn-optimize">✨ Otimizar currículo</button>
                </div>
                <div id="optimize-panel"></div>
            </div>`;
        },

        pronto() {
            const diag = diagnoseResume(state);
            return `
            <div class="final-screen">
                <div class="final-header">
                    <span class="success-icon">✓</span>
                    <h2>Seu currículo está pronto!</h2>
                </div>
                <div class="final-checks">
                    ${diag.checks.map(c => `<span class="final-check ${c.ok ? "" : "pending"}">${c.ok ? "✓" : "○"} ${c.label}</span>`).join("")}
                </div>
                <div class="final-actions">
                    <button class="btn btn-primary btn-lg" id="btn-pdf">📄 Baixar PDF</button>
                    <button class="btn btn-outline btn-lg" id="btn-print">🖨️ Imprimir / Salvar como PDF</button>
                    <button class="btn btn-outline" id="btn-edit">✏️ Editar currículo</button>
                    <button class="btn btn-ghost" id="btn-new-version">＋ Criar nova versão</button>
                </div>
                ${diag.recommendations.length ? `<div class="card"><h3 class="card-title">Sugestões para melhorar ainda mais</h3><ul class="diag-list">${diag.recommendations.map(r => `<li class="tip">💡 ${r}</li>`).join("")}</ul></div>` : ""}
            </div>
            <div class="preview-paper preview-final" id="preview">${renderResume(state)}</div>`;
        }
    };

    /* ---------- Bindings por etapa ---------- */
    const stepBindings = {
        objetivo() {
            document.querySelectorAll("#obj-types .option-card").forEach(btn => {
                btn.onclick = () => {
                    state.objective.type = btn.dataset.type;
                    const map = { "jovem-aprendiz": "jovem-aprendiz", "estagio": "estagiario" };
                    if (map[state.objective.type]) state.objective.role = map[state.objective.type];
                    renderStep();
                };
            });
            document.querySelectorAll(".role-chip").forEach(btn => {
                btn.onclick = () => {
                    state.objective.role = btn.dataset.role;
                    state.objective.customRole = "";
                    renderStep();
                };
            });
            const subWrap = document.getElementById("subarea-wrap");
            const role = findRole(state.objective.role);
            if (role && role.subareas) {
                subWrap.innerHTML = `<h4 class="role-cat">Qual a área dentro de ${esc(role.title)}?</h4>
                    <div class="role-grid">${role.subareas.map(s => `<button class="role-chip small ${state.objective.subarea === s ? "selected" : ""}" data-subarea="${esc(s)}">${esc(s)}</button>`).join("")}
                    <button class="role-chip small ${state.objective.subarea === "Ainda não sei" ? "selected" : ""}" data-subarea="Ainda não sei">Ainda não sei</button></div>`;
                subWrap.querySelectorAll("[data-subarea]").forEach(b => b.onclick = () => {
                    state.objective.subarea = b.dataset.subarea;
                    subWrap.querySelectorAll(".role-chip").forEach(x => x.classList.remove("selected"));
                    b.classList.add("selected");
                    updatePreview();
                });
            }
        },

        formacao() {
            const form = document.getElementById("edu-form");
            document.getElementById("edu-add").onclick = () => {
                editingEducationIndex = null;
                form.style.display = "block";
                ["edu-type", "edu-course", "edu-inst", "edu-city", "edu-end"].forEach(id => document.getElementById(id).value = "");
                document.getElementById("edu-status").value = "concluido";
                form.scrollIntoView({ behavior: "smooth" });
            };
            document.getElementById("edu-cancel").onclick = () => { form.style.display = "none"; };
            document.getElementById("edu-save").onclick = () => {
                clearErrors();
                const type = document.getElementById("edu-type").value;
                const inst = document.getElementById("edu-inst").value.trim();
                if (!type) return fieldError("edu-type", "Selecione o tipo de formação.");
                if (!inst) return fieldError("edu-inst", "Informe a instituição.");
                const item = {
                    type,
                    course: document.getElementById("edu-course").value.trim(),
                    institution: inst,
                    city: document.getElementById("edu-city").value.trim(),
                    status: document.getElementById("edu-status").value,
                    endYear: document.getElementById("edu-end").value.trim()
                };
                if (editingEducationIndex === null) state.education.push(item);
                else state.education[editingEducationIndex] = item;
                Storage.save(state); renderStep();
            };
            document.querySelectorAll("[data-edit-edu]").forEach(b => b.onclick = () => {
                editingEducationIndex = +b.dataset.editEdu;
                const e = state.education[editingEducationIndex];
                form.style.display = "block";
                document.getElementById("edu-type").value = e.type;
                document.getElementById("edu-course").value = e.course || "";
                document.getElementById("edu-inst").value = e.institution || "";
                document.getElementById("edu-city").value = e.city || "";
                document.getElementById("edu-status").value = e.status || "concluido";
                document.getElementById("edu-end").value = e.endYear || "";
            });
            document.querySelectorAll("[data-del-edu]").forEach(b => b.onclick = () => {
                if (confirm("Remover esta formação?")) { state.education.splice(+b.dataset.delEdu, 1); Storage.save(state); renderStep(); }
            });
        },

        experiencia() {
            const yes = document.getElementById("worked-yes");
            if (yes) {
                yes.onclick = () => { state.isFirstJob = false; renderStep(); };
                document.getElementById("worked-no").onclick = () => { state.isFirstJob = true; renderStep(); };
                return;
            }
            const switchBtn = document.getElementById("switch-experienced");
            if (switchBtn) switchBtn.onclick = () => { state.isFirstJob = false; renderStep(); };

            const expForm = document.getElementById("exp-form");
            if (expForm) {
                document.getElementById("exp-add").onclick = () => {
                    editingExperienceIndex = null;
                    expForm.style.display = "block";
                    ["exp-role", "exp-company", "exp-city", "exp-start-y", "exp-end-y", "exp-activities", "exp-results"].forEach(id => document.getElementById(id).value = "");
                    document.getElementById("exp-current").checked = false;
                    expForm.scrollIntoView({ behavior: "smooth" });
                };
                document.getElementById("exp-cancel").onclick = () => { expForm.style.display = "none"; };
                document.getElementById("exp-current").onchange = (e) => {
                    const endM = document.getElementById("exp-end-m"), endY = document.getElementById("exp-end-y");
                    endM.disabled = endY.disabled = e.target.checked;
                };
                document.getElementById("exp-save").onclick = () => {
                    clearErrors();
                    const role = document.getElementById("exp-role").value.trim();
                    const company = document.getElementById("exp-company").value.trim();
                    const startY = document.getElementById("exp-start-y").value.trim();
                    const current = document.getElementById("exp-current").checked;
                    const endY = document.getElementById("exp-end-y").value.trim();
                    const activities = document.getElementById("exp-activities").value.trim();
                    if (!role) return fieldError("exp-role", "Informe o cargo.");
                    if (!company) return fieldError("exp-company", "Informe a empresa.");
                    if (!startY || !/^\d{4}$/.test(startY)) return fieldError("exp-start-y", "Informe o ano de início (AAAA).");
                    if (!current) {
                        if (endY && !/^\d{4}$/.test(endY)) return fieldError("exp-end-y", "Ano inválido.");
                        if (endY && +endY < +startY) return fieldError("exp-end-y", "O término não pode ser anterior ao início.");
                    }
                    if (!activities) return fieldError("exp-activities", "Descreva pelo menos uma atividade.");
                    const item = {
                        role, company,
                        city: document.getElementById("exp-city").value.trim(),
                        contractType: document.getElementById("exp-contract").value,
                        startMonth: +document.getElementById("exp-start-m").value,
                        startYear: +startY,
                        current,
                        endMonth: current ? null : (+document.getElementById("exp-end-m").value || null),
                        endYear: current ? null : (endY ? +endY : null),
                        activities, results: document.getElementById("exp-results").value.trim()
                    };
                    if (editingExperienceIndex === null) state.experiences.push(item);
                    else state.experiences[editingExperienceIndex] = item;
                    Storage.save(state); renderStep();
                };
                document.querySelectorAll("[data-edit-exp]").forEach(b => b.onclick = () => {
                    editingExperienceIndex = +b.dataset.editExp;
                    const e = state.experiences[editingExperienceIndex];
                    expForm.style.display = "block";
                    document.getElementById("exp-role").value = e.role;
                    document.getElementById("exp-company").value = e.company;
                    document.getElementById("exp-city").value = e.city || "";
                    document.getElementById("exp-contract").value = e.contractType || "clt";
                    document.getElementById("exp-start-m").value = e.startMonth || 1;
                    document.getElementById("exp-start-y").value = e.startYear || "";
                    document.getElementById("exp-end-m").value = e.endMonth || 12;
                    document.getElementById("exp-end-y").value = e.endYear || "";
                    document.getElementById("exp-current").checked = !!e.current;
                    document.getElementById("exp-current").dispatchEvent(new Event("change"));
                    document.getElementById("exp-activities").value = e.activities || "";
                    document.getElementById("exp-results").value = e.results || "";
                });
                document.querySelectorAll("[data-del-exp]").forEach(b => b.onclick = () => {
                    if (confirm("Remover esta experiência?")) { state.experiences.splice(+b.dataset.delExp, 1); Storage.save(state); renderStep(); }
                });
            }

            const pracForm = document.getElementById("prac-form");
            if (pracForm) {
                document.getElementById("prac-add").onclick = () => {
                    pracForm.style.display = "block";
                    ["prac-type", "prac-org", "prac-period", "prac-desc"].forEach(id => document.getElementById(id).value = "");
                    pracForm.scrollIntoView({ behavior: "smooth" });
                };
                document.getElementById("prac-cancel").onclick = () => { pracForm.style.display = "none"; };
                document.getElementById("prac-save").onclick = () => {
                    clearErrors();
                    const type = document.getElementById("prac-type").value;
                    const desc = document.getElementById("prac-desc").value.trim();
                    if (!type) return fieldError("prac-type", "Selecione o tipo.");
                    if (!desc) return fieldError("prac-desc", "Descreva o que você fazia.");
                    state.practicalExperiences.push({
                        type,
                        organization: document.getElementById("prac-org").value.trim(),
                        period: document.getElementById("prac-period").value.trim(),
                        description: professionalizeActivities(desc).join("; ") || desc
                    });
                    Storage.save(state); renderStep();
                };
                document.querySelectorAll("[data-edit-prac]").forEach(b => b.onclick = () => {
                    const i = +b.dataset.editPrac;
                    const p = state.practicalExperiences[i];
                    pracForm.style.display = "block";
                    document.getElementById("prac-type").value = p.type;
                    document.getElementById("prac-org").value = p.organization || "";
                    document.getElementById("prac-period").value = p.period || "";
                    document.getElementById("prac-desc").value = p.description || "";
                    state.practicalExperiences.splice(i, 1);
                });
                document.querySelectorAll("[data-del-prac]").forEach(b => b.onclick = () => {
                    if (confirm("Remover?")) { state.practicalExperiences.splice(+b.dataset.delPrac, 1); Storage.save(state); renderStep(); }
                });
            }
        },

        cursos() {
            const form = document.getElementById("course-form");
            document.getElementById("course-add").onclick = () => {
                editingCourseIndex = null;
                form.style.display = "block";
                ["course-name", "course-inst", "course-hours", "course-year", "course-mod"].forEach(id => document.getElementById(id).value = "");
                form.scrollIntoView({ behavior: "smooth" });
            };
            document.getElementById("course-cancel").onclick = () => { form.style.display = "none"; };
            document.getElementById("course-save").onclick = () => {
                clearErrors();
                const name = document.getElementById("course-name").value.trim();
                if (!name) return fieldError("course-name", "Informe o nome do curso.");
                const item = {
                    name,
                    institution: document.getElementById("course-inst").value.trim(),
                    hours: document.getElementById("course-hours").value.trim(),
                    year: document.getElementById("course-year").value.trim(),
                    modality: document.getElementById("course-mod").value
                };
                if (editingCourseIndex === null) state.courses.push(item);
                else state.courses[editingCourseIndex] = item;
                Storage.save(state); renderStep();
            };
            document.querySelectorAll("[data-suggest-course]").forEach(b => b.onclick = () => {
                state.courses.push({ name: b.dataset.suggestCourse, institution: "", hours: "", year: "", modality: "" });
                Storage.save(state); renderStep();
            });
            document.querySelectorAll("[data-edit-course]").forEach(b => b.onclick = () => {
                editingCourseIndex = +b.dataset.editCourse;
                const c = state.courses[editingCourseIndex];
                form.style.display = "block";
                document.getElementById("course-name").value = c.name;
                document.getElementById("course-inst").value = c.institution || "";
                document.getElementById("course-hours").value = c.hours || "";
                document.getElementById("course-year").value = c.year || "";
                document.getElementById("course-mod").value = c.modality || "";
            });
            document.querySelectorAll("[data-del-course]").forEach(b => b.onclick = () => {
                if (confirm("Remover este curso?")) { state.courses.splice(+b.dataset.delCourse, 1); Storage.save(state); renderStep(); }
            });
        },

        competencias() {
            const toggle = (arr, val) => {
                const i = arr.indexOf(val);
                if (i >= 0) arr.splice(i, 1); else arr.push(val);
                Storage.save(state); updatePreview();
            };
            document.querySelectorAll("#role-skills [data-skill]").forEach(b => b.onclick = () => {
                toggle(state.behavioralSkills, b.dataset.skill);
                b.classList.toggle("chip-on");
            });
            document.querySelectorAll("#tech-skills [data-tech]").forEach(b => b.onclick = () => {
                toggle(state.techSkills, b.dataset.tech);
                b.classList.toggle("chip-on");
            });
            document.querySelectorAll("#custom-skills [data-tech]").forEach(b => b.onclick = () => {
                toggle(state.techSkills, b.dataset.tech);
                renderStep();
            });
            document.querySelectorAll("#custom-skills [data-beh]").forEach(b => b.onclick = () => {
                toggle(state.behavioralSkills, b.dataset.beh);
                renderStep();
            });
            const custom = document.getElementById("skill-custom");
            custom.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && custom.value.trim()) {
                    e.preventDefault();
                    const v = custom.value.trim();
                    if (!state.techSkills.includes(v) && !state.behavioralSkills.includes(v)) state.techSkills.push(v);
                    Storage.save(state); renderStep();
                }
            });
            document.querySelectorAll("[data-sq]").forEach(b => b.onclick = () => {
                const qi = +b.dataset.sq, oi = +b.dataset.so;
                state.behavioralAnswers[qi] = oi;
                const skills = situationalQuestions[qi].options[oi].skills;
                skills.forEach(s => { if (!state.behavioralSkills.includes(s)) state.behavioralSkills.push(s); });
                Storage.save(state);
                document.querySelectorAll(`[data-sq="${qi}"]`).forEach(x => x.classList.remove("selected"));
                b.classList.add("selected");
                updatePreview();
            });
        },

        idiomas() {
            document.getElementById("lang-add").onclick = () => {
                const name = document.getElementById("lang-name").value;
                if (!name) return;
                state.languages.push({ name, level: document.getElementById("lang-level").value });
                Storage.save(state); renderStep();
            };
            document.querySelectorAll("[data-del-lang]").forEach(b => b.onclick = () => {
                state.languages.splice(+b.dataset.delLang, 1); Storage.save(state); renderStep();
            });
        },

        adicional() {
            const travel = document.getElementById("add-travel");
            travel.onchange = () => { state.additional.willingToTravel = travel.checked; Storage.save(state); updatePreview(); };
        },

        revisao() {
            document.querySelectorAll(".step-list li").forEach((li, i) => {
                li.style.cursor = "pointer";
                li.title = "Clique para editar esta etapa";
                li.onclick = () => { currentStep = i; renderStep(); };
            });
            document.getElementById("btn-optimize").onclick = () => {
                const panel = document.getElementById("optimize-panel");
                const sugs = optimizeSuggestions(state);
                if (!sugs.length) {
                    panel.innerHTML = `<p class="info-box">✨ Seu currículo já está bem enxuto para este cargo. Nenhuma otimização necessária.</p>`;
                    return;
                }
                panel.innerHTML = `<h4 class="role-cat">Sugestões de otimização</h4>` +
                    sugs.map((s, i) => `
                        <div class="optimize-item">
                            <strong>${s.title}</strong>
                            <p>${s.text}</p>
                            <div class="inline-actions">
                                <button class="btn btn-primary btn-sm" data-apply-opt="${i}">Aplicar sugestão</button>
                                <button class="btn btn-ghost btn-sm" data-skip-opt="${i}">Manter como está</button>
                            </div>
                        </div>`).join("");
                panel.querySelectorAll("[data-apply-opt]").forEach(b => b.onclick = () => {
                    sugs[+b.dataset.applyOpt].apply(state);
                    Storage.save(state); renderStep();
                });
                panel.querySelectorAll("[data-skip-opt]").forEach(b => b.onclick = () => b.closest(".optimize-item").remove());
            };
        },

        pronto() {
            document.getElementById("btn-pdf").onclick = () => Pdf.download(state);
            document.getElementById("btn-print").onclick = () => window.print();
            document.getElementById("btn-edit").onclick = () => { currentStep = STEPS.length - 2; renderStep(); };
            document.getElementById("btn-new-version").onclick = () => {
                if (confirm("Criar nova versão? Você poderá escolher outro cargo — seus dados de contato, formação e experiências serão mantidos.")) {
                    state.objective.role = "";
                    state.objective.type = "";
                    state.objective.subarea = "";
                    state.objective.customRole = "";
                    state.objective.customObjective = "";
                    state.objective.customSummary = "";
                    currentStep = 0;
                    renderStep();
                }
            };
        }
    };

    /* ---------- Validadores ---------- */
    const validators = {
        objetivo() {
            if (!state.objective.type) { alert("Escolha o que você está procurando para continuar."); return false; }
            return true;
        },
        perfil() {
            clearErrors();
            const p = state.profile;
            let ok = true;
            if (!p.name || p.name.trim().length < 5) { fieldError("f-name", "Informe seu nome completo."); ok = false; }
            if (!p.city || !p.city.trim()) { fieldError("f-city", "Informe sua cidade."); ok = false; }
            if (!p.uf || !/^[A-Za-z]{2}$/.test(p.uf)) { fieldError("f-uf", "UF inválida (ex.: CE)."); ok = false; }
            if (!p.phone || p.phone.replace(/\D/g, "").length < 10) { fieldError("f-phone", "Telefone inválido. Use DDD + número."); ok = false; }
            if (!p.email || !/.+@.+\..+/.test(p.email)) { fieldError("f-email", "E-mail inválido."); ok = false; }
            ["linkedin", "github", "portfolio"].forEach(k => {
                if (p[k] && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/?#].*)?$/i.test(p[k])) {
                    fieldError(`f-${k}`, "URL inválida (ex.: linkedin.com/in/seunome)."); ok = false;
                }
            });
            return ok;
        },
        formacao() {
            if (!state.education.length) {
                if (!confirm("Você não adicionou formação. Deseja continuar mesmo assim?")) return false;
            }
            return true;
        },
        experiencia() {
            if (state.isFirstJob === null) { alert("Responda se você já trabalhou."); return false; }
            if (!state.isFirstJob && !state.experiences.length) {
                if (!confirm("Você não adicionou experiências. Deseja continuar?")) return false;
            }
            return true;
        },
        competencias() {
            const total = state.techSkills.length + state.behavioralSkills.length;
            if (total === 0) {
                if (!confirm("Você não selecionou competências. Deseja continuar?")) return false;
            }
            return true;
        },
        revisao() { return true; }
    };

    function monthOptions() {
        const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        return MESES.map((m, i) => `<option value="${i + 1}">${m}</option>`).join("");
    }

    function applyTheme() {
        const saved = localStorage.getItem("gc-theme");
        if (saved === "dark") document.documentElement.classList.add("dark");
        updateThemeIcon();
    }

    function toggleTheme() {
        const dark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("gc-theme", dark ? "dark" : "light");
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const btn = document.getElementById("theme-toggle");
        if (btn) btn.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
    }

    function bindGlobal() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "SELECT") {
                const next = document.getElementById("btn-next");
                if (next && document.querySelector(".wizard")) { e.preventDefault(); next.click(); }
            }
        });
        const themeBtn = document.getElementById("theme-toggle");
        if (themeBtn) themeBtn.onclick = toggleTheme;
    }

    return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
