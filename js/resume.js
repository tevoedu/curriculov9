/* ============================================================
   resume.js — Montagem e renderização do currículo
   Separa coleta de informação da seleção do que vai no documento.
   ============================================================ */

/* Seleciona e ordena as competências mais relevantes para o cargo */
function selectRelevantSkills(state, max = 8) {
    const role = findRole(state.objective.role);
    const all = [...(state.techSkills || []), ...(state.behavioralSkills || [])];
    if (!role) {
        // Sem cargo definido: deduplica e limita
        return [...new Set(all.map(s => s.trim()).filter(Boolean))].slice(0, max);
    }
    const priority = [...role.competencies, ...role.keywords];
    const scored = all.map(skill => {
        const s = skill.toLowerCase();
        let score = 0;
        for (let i = 0; i < priority.length; i++) {
            const p = priority[i].toLowerCase();
            if (s === p) score = Math.max(score, 100 - i);
            else if (s.includes(p) || p.includes(s)) score = Math.max(score, 60 - i);
        }
        return { skill, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const picked = [];
    const seen = new Set();
    for (const item of scored) {
        const key = item.skill.toLowerCase();
        if (!seen.has(key)) { picked.push(item.skill); seen.add(key); }
        if (picked.length >= max) break;
    }
    // Completa com as demais se ficou abaixo do mínimo
    if (picked.length < Math.min(4, all.length)) {
        for (const s of all) {
            if (picked.length >= max) break;
            if (!seen.has(s.toLowerCase())) { picked.push(s); seen.add(s.toLowerCase()); }
        }
    }
    return picked;
}

/* Filtra cursos relevantes para o cargo (mantém no máx 6) */
function selectRelevantCourses(state, max = 6) {
    const role = findRole(state.objective.role);
    const courses = state.courses || [];
    if (!role) return courses.slice(0, max);
    const priority = role.courses.map(c => c.toLowerCase());
    const scored = courses.map(c => {
        const n = (c.name || "").toLowerCase();
        let score = 0;
        priority.forEach((p, i) => { if (n.includes(p) || p.includes(n)) score = Math.max(score, 100 - i); });
        return { c, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, max).map(s => s.c);
}

/* Decide a ordem das seções conforme o perfil */
function sectionOrder(state) {
    if (state.isFirstJob) {
        return ["objective", "education", "courses", "skills", "practical", "experience", "languages", "additional"];
    }
    return ["objective", "summary", "experience", "education", "skills", "courses", "languages", "additional"];
}

/* Monta o modelo de dados do currículo a partir do estado */
function buildResumeModel(state) {
    const role = findRole(state.objective.role);
    const objective = state.objective.customObjective || generateObjective(state);
    const summary = state.isFirstJob ? (state.objective.customSummary || generateSummary(state)) : (state.objective.customSummary || generateSummary(state));
    const experiences = (state.experiences || [])
        .filter(e => e.role && (e.company || e.activities))
        .map(e => ({
            ...e,
            period: formatPeriod(e),
            bullets: professionalizeActivities(e.activities || "")
        }))
        .filter(e => e.bullets.length || e.company)
        .sort((a, b) => (b.startYear || 0) - (a.startYear || 0));

    const practical = (state.practicalExperiences || []).filter(p => p.description);

    return {
        role, objective, summary,
        name: state.profile.name || "",
        location: [state.profile.city, state.profile.uf].filter(Boolean).join(" / "),
        contacts: {
            phone: state.profile.phone || "",
            email: state.profile.email || "",
            linkedin: state.profile.linkedin || "",
            github: state.profile.github || "",
            portfolio: state.profile.portfolio || ""
        },
        isFirstJob: !!state.isFirstJob,
        sections: sectionOrder(state),
        experiences,
        practical,
        education: (state.education || []).filter(e => e.type || e.course),
        courses: selectRelevantCourses(state),
        skills: selectRelevantSkills(state, Math.max(99, (state.techSkills || []).length + (state.behavioralSkills || []).length)),
        languages: (state.languages || []).filter(l => l.name && l.level),
        additional: buildAdditional(state)
    };
}

/* Informações adicionais — somente quando relevantes */
function buildAdditional(state) {
    const items = [];
    const add = state.additional || {};
    if (add.cnh) items.push(`CNH categoria ${add.cnh}`);
    if (add.availability) items.push(add.availability);
    if (add.willingToTravel) items.push("Disponibilidade para viagens");
    if (add.pcd === "sim") items.push("Pessoa com deficiência");
    return items;
}

/* ---------- Renderização ---------- */
function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderResume(state) {
    const m = buildResumeModel(state);
    const c = m.contacts;
    const contactParts = [
        m.location,
        c.phone,
        c.email,
        c.linkedin ? formatLinkText(c.linkedin, "LinkedIn") : "",
        c.github ? formatLinkText(c.github, "GitHub") : "",
        c.portfolio ? formatLinkText(c.portfolio, "Portfólio") : ""
    ].filter(Boolean);

    let html = `<div class="cv" id="resume-doc">`;
    html += `<header class="cv-header">
        <h1 class="cv-name">${esc(m.name) || '<span class="cv-placeholder">Seu nome completo</span>'}</h1>
        <p class="cv-contact">${contactParts.map(esc).join(" &nbsp;|&nbsp; ")}</p>
    </header>`;

    const sectionRenderers = {
        objective: () => `<section class="cv-section">
            <h2>Objetivo Profissional</h2>
            <p>${esc(m.objective)}</p>
        </section>`,
        summary: () => m.isFirstJob && !state.objective.customSummary ? "" : `<section class="cv-section">
            <h2>Resumo Profissional</h2>
            <p>${esc(m.summary)}</p>
        </section>`,
        experience: () => m.experiences.length ? `<section class="cv-section">
            <h2>Experiência Profissional</h2>
            ${m.experiences.map(e => `
                <div class="cv-item">
                    <div class="cv-item-head">
                        <strong>${esc(e.company)}${e.city ? ` — ${esc(e.city)}` : ""}</strong>
                        <span class="cv-item-role">${esc(e.role)}${e.contractType && e.contractType !== "clt" ? ` (${esc(contractLabel(e.contractType))})` : ""}</span>
                        <span class="cv-item-period">${esc(e.period)}</span>
                    </div>
                    <ul>${e.bullets.slice(0, 5).map(b => `<li>${esc(b)}</li>`).join("")}</ul>
                    ${e.results ? `<p class="cv-result">${esc(e.results)}</p>` : ""}
                </div>`).join("")}
        </section>` : "",
        practical: () => m.practical.length ? `<section class="cv-section">
            <h2>Experiências Práticas</h2>
            ${m.practical.map(p => `
                <div class="cv-item">
                    <div class="cv-item-head">
                        <strong>${esc(practicalLabel(p.type))}</strong>
                        ${p.organization ? `<span class="cv-item-role">${esc(p.organization)}</span>` : ""}
                        ${p.period ? `<span class="cv-item-period">${esc(p.period)}</span>` : ""}
                    </div>
                    <p>${esc(p.description)}</p>
                </div>`).join("")}
        </section>` : "",
        education: () => m.education.length ? `<section class="cv-section">
            <h2>Formação Acadêmica</h2>
            ${m.education.map(e => `
                <div class="cv-item">
                    <div class="cv-item-head">
                        <strong>${esc(educationLabel(e.type))}${e.course ? ` em ${esc(e.course)}` : ""}</strong>
                        ${e.institution ? `<span class="cv-item-role">${esc(e.institution)}${e.city ? ` — ${esc(e.city)}` : ""}</span>` : ""}
                        <span class="cv-item-period">${esc(formatEducationPeriod(e))}</span>
                    </div>
                </div>`).join("")}
        </section>` : "",
        courses: () => m.courses.length ? `<section class="cv-section">
            <h2>Cursos e Certificações</h2>
            <ul class="cv-courses">
                ${m.courses.map(co => `<li>${esc(co.name)}${co.institution ? ` — ${esc(co.institution)}` : ""}${co.hours ? ` (${esc(co.hours)}h)` : ""}${co.year ? `, ${esc(co.year)}` : ""}</li>`).join("")}
            </ul>
        </section>` : "",
        skills: () => m.skills.length ? `<section class="cv-section">
            <h2>Competências</h2>
            <ul class="cv-skills">${m.skills.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
        </section>` : "",
        languages: () => m.languages.length ? `<section class="cv-section">
            <h2>Idiomas</h2>
            <ul class="cv-courses">${m.languages.map(l => `<li>${esc(l.name)} — ${esc(levelLabel(l.level))}</li>`).join("")}</ul>
        </section>` : "",
        additional: () => m.additional.length ? `<section class="cv-section">
            <h2>Informações Adicionais</h2>
            <ul class="cv-courses">${m.additional.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
        </section>` : ""
    };

    for (const key of m.sections) {
        if (sectionRenderers[key]) html += sectionRenderers[key]() || "";
    }
    html += `</div>`;
    return html;
}

function formatLinkText(url, label) {
    return label ? `${label}: ${url.replace(/^https?:\/\//, "")}` : url;
}
function contractLabel(t) {
    return { clt: "CLT", estagio: "Estágio", aprendiz: "Jovem Aprendiz", temporario: "Temporário", informal: "Informal", freelancer: "Freelancer", autonomo: "Autônomo", familiar: "Trabalho familiar", voluntariado: "Voluntariado" }[t] || t;
}
function practicalLabel(t) {
    return {
        estagio: "Estágio", aprendiz: "Jovem Aprendiz", voluntariado: "Voluntariado",
        escolar: "Projeto Escolar", pessoal: "Projeto Pessoal", informal: "Experiência Informal",
        familiar: "Negócio da Família", freelancer: "Trabalho Freelancer"
    }[t] || "Experiência Prática";
}
function educationLabel(t) {
    return {
        fundamental: "Ensino Fundamental", medio: "Ensino Médio", tecnico: "Curso Técnico",
        graduacao: "Graduação", pos: "Pós-graduação", outra: "Formação Complementar"
    }[t] || "Formação";
}
function levelLabel(l) {
    return { basico: "Básico", intermediario: "Intermediário", avancado: "Avançado", fluente: "Fluente" }[l] || l;
}

/* Diagnóstico do currículo (sem notas subjetivas) */
function diagnoseResume(state) {
    const checks = [];
    const p = state.profile || {};
    checks.push({ ok: !!(p.name && p.name.trim().length > 5), label: "Nome completo", hint: "Informe seu nome completo." });
    checks.push({ ok: !!(p.email && /.+@.+\..+/.test(p.email)), label: "E-mail", hint: "Informe um e-mail válido." });
    checks.push({ ok: !!(p.phone && p.phone.replace(/\D/g, "").length >= 10), label: "Telefone", hint: "Informe um telefone com DDD." });
    checks.push({ ok: !!(p.city), label: "Cidade/UF", hint: "Informe sua cidade e UF." });
    checks.push({ ok: !!(state.objective && state.objective.role), label: "Objetivo profissional", hint: "Escolha o cargo pretendido." });
    checks.push({ ok: (state.education || []).length > 0, label: "Formação", hint: "Adicione sua formação escolar." });
    checks.push({ ok: state.isFirstJob ? ((state.practicalExperiences || []).length > 0 || (state.courses || []).length > 0) : (state.experiences || []).length > 0, label: state.isFirstJob ? "Experiências práticas ou cursos" : "Experiência profissional", hint: state.isFirstJob ? "Inclua projetos, voluntariado ou cursos práticos." : "Adicione suas experiências de trabalho." });
    const skills = selectRelevantSkills(state, 99);
    checks.push({ ok: skills.length >= 3, label: "Competências", hint: "Inclua pelo menos 3 competências." });

    const recommendations = [];
    const role = findRole(state.objective && state.objective.role);
    if (role && role.id === "auxiliar-administrativo") {
        const has = [...(state.techSkills || [])].some(s => /excel/i.test(s)) || (state.courses || []).some(c => /excel/i.test(c.name || ""));
        if (!has) recommendations.push("Para Auxiliar Administrativo, um curso de Excel costuma ser muito valorizado.");
    }
    if (role && role.links && !p.github && !p.portfolio) {
        recommendations.push("Para vagas de tecnologia, um GitHub ou portfólio aumenta muito suas chances.");
    }
    if (!p.linkedin && !state.isFirstJob) {
        recommendations.push("Um perfil no LinkedIn pode ajudar os recrutadores a te encontrar.");
    }
    if (skills.length > 10) recommendations.push(`Você tem ${skills.length} competências. Para este cargo, manter 6 a 8 mais relevantes deixa o currículo mais forte. Use o modo Otimizar.`);
    return { checks, recommendations };
}

/* Modo otimizar: sugere reduções sem apagar dados */
function optimizeSuggestions(state) {
    const suggestions = [];
    const role = findRole(state.objective.role);
    const skills = [...(state.techSkills || []), ...(state.behavioralSkills || [])];
    if (skills.length > 8 && role) {
        suggestions.push({
            id: "skills", title: "Reduzir competências",
            text: `Você possui ${skills.length} competências. Para ${role.title}, 6 a 8 mais relevantes são suficientes.`,
            apply: (s) => {
                const keep = selectRelevantSkills(s, 8);
                s.techSkills = (s.techSkills || []).filter(x => keep.includes(x));
                s.behavioralSkills = (s.behavioralSkills || []).filter(x => keep.includes(x));
            }
        });
    }
    if ((state.courses || []).length > 6) {
        suggestions.push({
            id: "courses", title: "Reduzir cursos",
            text: `Você possui ${state.courses.length} cursos. Manter os 6 mais relevantes para o cargo deixa o currículo mais objetivo.`,
            apply: (s) => { s.courses = selectRelevantCourses(s, 6); }
        });
    }
    if ((state.experiences || []).length > 4) {
        suggestions.push({
            id: "exp", title: "Resumir experiências antigas",
            text: "Com mais de 4 experiências, considere manter apenas as 3 mais recentes e relevantes para esta vaga.",
            apply: (s) => {
                s.experiences = [...s.experiences]
                    .sort((a, b) => (b.startYear || 0) - (a.startYear || 0))
                    .slice(0, 3);
            }
        });
    }
    const longActivities = (state.experiences || []).filter(e => (e.activities || "").length > 400);
    if (longActivities.length) {
        suggestions.push({
            id: "text", title: "Encurtar descrições",
            text: "Algumas descrições de atividades estão longas. Textos curtos e diretos são lidos com mais atenção.",
            apply: (s) => {
                s.experiences = (s.experiences || []).map(e =>
                    (e.activities || "").length > 400 ? { ...e, activities: e.activities.slice(0, 400) } : e);
            }
        });
    }
    return suggestions;
}
