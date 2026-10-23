/* ============================================================
   data.js — Dados internos: mercado local, cargos, competências
   Pesquisa de mercado: IDT/SINE Iguatu (vagas.iguatu@idt.org.br),
   Indeed, guias de currículo 2026. Atualizado em: 2026-09-17
   ============================================================ */

const localMarket = {
    city: "Iguatu",
    state: "CE",
    sources: [
        { name: "IDT/SINE Iguatu — vagas disponíveis", url: "https://idt.org.br/vagas-disponiveis" },
        { name: "Indeed — vagas Iguatu, CE", url: "https://br.indeed.com" },
        { name: "Guias de currículo ATS 2026 (beavagas, Na Prática, Serasa Experian)" }
    ],
    commonRoles: [
        "Vendedor interno", "Vendedor porta a porta", "Vendedor pracista",
        "Repositor em supermercados", "Recepcionista atendente", "Auxiliar administrativo",
        "Auxiliar de escritório", "Auxiliar financeiro", "Alimentador de linha de produção",
        "Auxiliar de linha de produção", "Atendente de farmácia (balconista)", "Auxiliar de Cartório",
        "Consultor de vendas", "Promotor de vendas", "Operador de telemarketing",
        "Auxiliar de limpeza", "Pedreiro", "Servente de obras", "Soldador",
        "Porteiro", "Atendente de lanchonete", "Cozinheiro", "Auxiliar de cozinha",
        "Motorista entregador", "Estoquista", "Operador de caixa", "Auxiliar contábil"
    ],
    commonSkills: [
        "Atendimento ao cliente", "Atendimento ao público", "Comunicação", "Organização",
        "Organização documental", "Atenção aos detalhes", "Digitação", "Excel", "Word",
        "Negociação", "Trabalho em equipe", "Reposição de produtos", "Controle de estoque",
        "Rotinas administrativas", "Informática", "Pontualidade"
    ]
};

/* Banco de competências por categoria */
const skillBank = {
    atendimento: [
        "Atendimento ao cliente", "Atendimento ao público", "Comunicação",
        "Resolução de dúvidas", "Relacionamento interpessoal", "Atendimento telefônico",
        "Atendimento por WhatsApp", "Escuta ativa", "Paciência e empatia"
    ],
    administrativo: [
        "Organização documental", "Controle de arquivos", "Excel", "Word",
        "Rotinas administrativas", "Digitação", "Emissão de notas fiscais",
        "Contas a pagar e receber", "Agendamento", "Atendimento telefônico"
    ],
    vendas: [
        "Atendimento e vendas", "Negociação", "Prospecção de clientes",
        "Pós-venda", "Relacionamento com clientes", "Fechamento de vendas",
        "Demonstração de produtos", "Metas e resultados"
    ],
    estoque: [
        "Organização de estoque", "Conferência de mercadorias", "Inventário",
        "Reposição de produtos", "Controle de mercadorias", "Separação de pedidos",
        "Embalagem de produtos", "Recebimento de mercadorias"
    ],
    informatica: [
        "Manutenção de computadores", "Hardware", "Instalação de software",
        "Redes de computadores", "Suporte técnico", "Sistemas operacionais",
        "HTML", "CSS", "JavaScript", "Python", "Banco de dados",
        "Montagem e configuração de PCs"
    ],
    geral: [
        "Organização", "Pontualidade", "Responsabilidade", "Trabalho em equipe",
        "Proatividade", "Atenção aos detalhes", "Comprometimento", "Disponibilidade",
        "Agilidade", "Iniciativa"
    ]
};

/* Biblioteca de cargos — baseada em vagas reais do IDT/SINE Iguatu e região */
const roleLibrary = [
    /* ---------- ATENDIMENTO E COMÉRCIO ---------- */
    {
        id: "atendente", title: "Atendente", category: "Atendimento e comércio",
        variations: ["Atendente", "Atendente de loja", "Atendimento ao público"],
        competencies: ["Atendimento ao cliente", "Comunicação", "Organização", "Trabalho em equipe", "Pontualidade"],
        keywords: ["atendimento", "atendimento ao cliente", "atendimento ao público", "comunicação"],
        knowledge: ["Noções de vendas", "Organização de loja", "Atendimento por WhatsApp"],
        courses: ["Atendimento ao cliente", "Comunicação", "Vendas", "Informática básica"],
        activities: ["Atendimento ao cliente", "Organização do ambiente de vendas", "Reposição e organização de produtos"],
        objectives: {
            first: "Busco minha primeira oportunidade profissional na área de atendimento, contribuindo com comunicação, organização e disposição para aprender.",
            experienced: "Busco oportunidade na área de atendimento ao cliente, contribuindo com experiência em atendimento, organização e bom relacionamento interpessoal."
        },
        summaries: {
            first: "Pessoa dedicada, com facilidade de comunicação e interesse em desenvolver experiência no atendimento ao cliente.",
            experienced: "Profissional com experiência em atendimento ao cliente e organização de ambiente comercial."
        }
    },
    {
        id: "vendedor", title: "Vendedor", category: "Atendimento e comércio",
        variations: ["Vendedor", "Vendedor interno", "Consultor de vendas", "Vendedor de comércio varejista"],
        competencies: ["Atendimento e vendas", "Negociação", "Comunicação", "Relacionamento com clientes", "Prospecção de clientes"],
        keywords: ["vendas", "atendimento", "negociação", "prospecção", "pós-venda", "metas"],
        knowledge: ["Técnicas de vendas", "Atendimento consultivo", "Pós-venda"],
        courses: ["Vendas", "Negociação", "Atendimento ao cliente", "Comunicação"],
        activities: ["Atendimento a clientes", "Negociação e fechamento de vendas", "Prospecção e relacionamento com clientes"],
        objectives: {
            first: "Busco minha primeira oportunidade na área de vendas, contribuindo com comunicação, empenho e vontade de aprender técnicas comerciais.",
            experienced: "Busco oportunidade na área de vendas, contribuindo com experiência em atendimento, negociação e foco em resultados."
        },
        summaries: {
            first: "Pessoa comunicativa, com interesse em desenvolver carreira na área comercial e facilidade de relacionamento.",
            experienced: "Profissional com experiência em vendas e atendimento ao cliente, com foco em resultados e relacionamento."
        }
    },
    {
        id: "operador-caixa", title: "Operador de Caixa", category: "Atendimento e comércio",
        variations: ["Operador de caixa", "Caixa de loja"],
        competencies: ["Operação de caixa", "Atendimento ao cliente", "Atenção aos detalhes", "Responsabilidade", "Pontualidade"],
        keywords: ["operação de caixa", "atendimento", "conferência de valores", "sistema de caixa"],
        knowledge: ["Sistemas de caixa", "Manuseio de valores", "Abertura e fechamento de caixa"],
        courses: ["Operação de caixa", "Atendimento ao cliente", "Informática básica"],
        activities: ["Operação de caixa", "Atendimento ao cliente", "Conferência de valores e fechamento de caixa"],
        objectives: {
            first: "Busco minha primeira oportunidade como operador de caixa, contribuindo com responsabilidade, atenção e pontualidade.",
            experienced: "Busco oportunidade como operador de caixa, contribuindo com experiência em operação de caixa e atendimento ao cliente."
        },
        summaries: {
            first: "Pessoa responsável e atenta, com interesse em atuar na operação de caixa e atendimento.",
            experienced: "Profissional com experiência em operação de caixa, atendimento ao cliente e conferência de valores."
        }
    },
    {
        id: "repositor", title: "Repositor", category: "Operacional",
        variations: ["Repositor", "Repositor de mercadorias", "Repositor em supermercados"],
        competencies: ["Reposição de produtos", "Organização", "Agilidade", "Trabalho em equipe", "Atenção aos detalhes"],
        keywords: ["reposição", "organização de mercadorias", "inventário", "exposição de produtos"],
        knowledge: ["Organização de gôndolas", "Validade de produtos", "Noções de inventário"],
        courses: ["Informática básica", "Atendimento ao cliente"],
        activities: ["Reposição e organização de mercadorias", "Conferência de validade e preços", "Apoio ao inventário"],
        objectives: {
            first: "Busco minha primeira oportunidade como repositor, contribuindo com agilidade, organização e disposição para o trabalho.",
            experienced: "Busco oportunidade como repositor, contribuindo com experiência em reposição, organização de mercadorias e inventário."
        },
        summaries: {
            first: "Pessoa ágil e organizada, com disposição para atuar na reposição e organização de mercadorias.",
            experienced: "Profissional com experiência em reposição e organização de mercadorias em supermercados."
        }
    },
    {
        id: "estoquista", title: "Estoquista / Auxiliar de Estoque", category: "Operacional",
        variations: ["Estoquista", "Auxiliar de estoque", "Auxiliar de armazenamento"],
        competencies: ["Controle de estoque", "Conferência de mercadorias", "Organização", "Separação de pedidos", "Inventário"],
        keywords: ["estoque", "conferência", "inventário", "separação de pedidos", "controle de mercadorias"],
        knowledge: ["Organização de depósito", "Conferência de entrada e saída", "Noções de inventário"],
        courses: ["Informática básica", "Estoque e logística básica"],
        activities: ["Controle e organização de estoque", "Conferência de mercadorias", "Separação de pedidos"],
        objectives: {
            first: "Busco minha primeira oportunidade na área de estoque, contribuindo com organização, responsabilidade e atenção aos detalhes.",
            experienced: "Busco oportunidade na área de estoque, contribuindo com experiência em conferência, organização e controle de mercadorias."
        },
        summaries: {
            first: "Pessoa organizada e responsável, com interesse em atuar no controle e organização de estoque.",
            experienced: "Profissional com experiência em estoque, conferência de mercadorias e separação de pedidos."
        }
    },
    {
        id: "fiscal-loja", title: "Fiscal de Loja", category: "Atendimento e comércio",
        variations: ["Fiscal de loja", "Prevenção de perdas"],
        competencies: ["Atenção aos detalhes", "Responsabilidade", "Observação", "Comunicação", "Trabalho em equipe"],
        keywords: ["prevenção de perdas", "vigilância de loja", "atendimento"],
        knowledge: ["Prevenção de perdas", "Procedimentos de segurança"],
        courses: ["Atendimento ao cliente", "Informática básica"],
        activities: ["Vigilância e organização do ambiente de loja", "Atendimento e orientação a clientes"],
        objectives: {
            first: "Busco minha primeira oportunidade como fiscal de loja, contribuindo com atenção, responsabilidade e disposição para aprender.",
            experienced: "Busco oportunidade como fiscal de loja, contribuindo com experiência em prevenção e atendimento ao cliente."
        },
        summaries: {
            first: "Pessoa atenta e responsável, com interesse em atuar na fiscalização e organização de loja.",
            experienced: "Profissional com experiência em fiscalização de loja, prevenção de perdas e atendimento."
        }
    },
    {
        id: "balconista", title: "Balconista / Atendente de Farmácia", category: "Atendimento e comércio",
        variations: ["Balconista", "Atendente de farmácia - balconista", "Atendente de balcão"],
        competencies: ["Atendimento ao cliente", "Comunicação", "Organização", "Atenção aos detalhes", "Responsabilidade"],
        keywords: ["atendimento de balcão", "vendas", "organização de produtos", "conferência de receitas"],
        knowledge: ["Noções de medicamentos", "Conferência de validades"],
        courses: ["Atendimento ao cliente", "Balconista de farmácia", "Informática básica"],
        activities: ["Atendimento de balcão", "Organização e reposição de produtos", "Apoio na conferência de pedidos"],
        objectives: {
            first: "Busco minha primeira oportunidade como balconista, contribuindo com atendimento, organização e responsabilidade.",
            experienced: "Busco oportunidade como balconista/atendente de farmácia, contribuindo com experiência em atendimento de balcão."
        },
        summaries: {
            first: "Pessoa atenciosa e organizada, com interesse em atuar no atendimento de balcão.",
            experienced: "Profissional com experiência em atendimento de balcão e organização de produtos."
        }
    },
    {
        id: "telemarketing", title: "Telemarketing / Atendente de Telemarketing", category: "Atendimento e comércio",
        variations: ["Telemarketing", "Operador de telemarketing", "Atendente de telemarketing"],
        competencies: ["Atendimento telefônico", "Comunicação", "Escuta ativa", "Paciência", "Informática"],
        keywords: ["telemarketing", "atendimento receptivo", "atendimento ativo", "ligações"],
        knowledge: ["Procedimentos de call center", "Sistemas de atendimento"],
        courses: ["Telemarketing", "Comunicação", "Informática básica"],
        activities: ["Atendimento telefônico a clientes", "Registro de informações no sistema"],
        objectives: {
            first: "Busco minha primeira oportunidade em telemarketing, contribuindo com boa comunicação, paciência e agilidade.",
            experienced: "Busco oportunidade em telemarketing, contribuindo com experiência em atendimento telefônico e comunicação."
        },
        summaries: {
            first: "Pessoa comunicativa e paciente, com interesse em atuar no atendimento telefônico.",
            experienced: "Profissional com experiência em atendimento telefônico e registro de informações."
        }
    },
    {
        id: "recepcionista", title: "Recepcionista", category: "Atendimento e comércio",
        variations: ["Recepcionista", "Recepcionista atendente", "Recepcionista de hotel"],
        competencies: ["Atendimento ao público", "Comunicação", "Organização", "Agendamento", "Informática"],
        keywords: ["recepção", "atendimento", "agendamento", "organização"],
        knowledge: ["Sistemas de agendamento", "Rotinas de recepção"],
        courses: ["Informática básica", "Atendimento ao cliente", "Recepção"],
        activities: ["Atendimento e orientação de visitantes", "Agendamento e organização da recepção"],
        objectives: {
            first: "Busco minha primeira oportunidade como recepcionista, contribuindo com atendimento, organização e boa comunicação.",
            experienced: "Busco oportunidade como recepcionista, contribuindo com experiência em atendimento e organização de recepção."
        },
        summaries: {
            first: "Pessoa educada e organizada, com facilidade de comunicação e interesse em atuar na recepção.",
            experienced: "Profissional com experiência em recepção, atendimento ao público e agendamento."
        }
    },
    {
        id: "assistente-loja", title: "Assistente de Loja", category: "Atendimento e comércio",
        variations: ["Assistente de loja", "Assistente de vendas"],
        competencies: ["Atendimento ao cliente", "Organização de loja", "Vendas", "Comunicação", "Trabalho em equipe"],
        keywords: ["atendimento", "organização de loja", "vendas", "visual merchandising"],
        knowledge: ["Organização de setores", "Atendimento e vendas"],
        courses: ["Atendimento ao cliente", "Vendas", "Informática básica"],
        activities: ["Atendimento ao cliente", "Organização e limpeza do setor", "Apoio em vendas e exposição de produtos"],
        objectives: {
            first: "Busco minha primeira oportunidade como assistente de loja, contribuindo com atendimento, organização e empenho.",
            experienced: "Busco oportunidade como assistente de loja, contribuindo com experiência em atendimento e organização comercial."
        },
        summaries: {
            first: "Pessoa proativa e organizada, com interesse em atuar no comércio varejista.",
            experienced: "Profissional com experiência em atendimento, organização de loja e apoio às vendas."
        }
    },

    /* ---------- ADMINISTRATIVO ---------- */
    {
        id: "auxiliar-cartorio", title: "Auxiliar de Cartório", category: "Administrativo",
        variations: ["Auxiliar de cartório", "Auxiliar de cartório extrajudicial", "Auxiliar de serviços cartorários"],
        // Perfil direcionado ao anúncio: atendimento ao público, proatividade, organização e vontade de aprender.
        competencies: [
            "Atendimento ao público", "Organização documental", "Atenção aos detalhes",
            "Comunicação", "Proatividade", "Disposição para aprender", "Digitação", "Responsabilidade"
        ],
        keywords: [
            "auxiliar de cartório", "atendimento ao público", "organização de documentos",
            "arquivamento", "digitação", "conferência de documentos", "rotinas administrativas",
            "serviços notariais", "serviços registrais", "atenção aos detalhes"
        ],
        knowledge: [
            "Organização e arquivamento de documentos", "Digitação e edição de textos",
            "Informática básica", "Atendimento ao público", "Noções de serviços notariais e registrais"
        ],
        courses: [
            "Atendimento ao público", "Informática básica", "Word", "Organização de documentos",
            "Rotinas administrativas", "Noções de serviços notariais e registrais"
        ],
        activities: [
            "Atendimento ao público", "Organização e arquivamento de documentos",
            "Digitação e registro de informações", "Conferência de documentos e dados"
        ],
        objectives: {
            first: "Busco minha primeira oportunidade como Auxiliar de Cartório, contribuindo com atendimento ao público, organização, atenção aos detalhes e disposição para aprender.",
            experienced: "Busco oportunidade como Auxiliar de Cartório, colocando em prática minha experiência profissional, organização, atenção aos detalhes e disposição para aprender as rotinas do cartório."
        },
        summaries: {
            first: "Pessoa organizada, proativa e comunicativa, com interesse em atuar no atendimento ao público e aprender rotinas cartorárias.",
            experienced: "Profissional com vivência de trabalho, perfil organizado e proativo, com interesse em contribuir no atendimento ao público e na organização documental de um cartório."
        },
        // Evita afirmar anos de experiência em cartório quando a vivência profissional foi em outra área.
        summaryUsesTransferableExperience: true
    },
    {
        id: "auxiliar-administrativo", title: "Auxiliar Administrativo", category: "Administrativo",
        variations: ["Auxiliar administrativo", "Auxiliar de escritório", "Assistente administrativo"],
        competencies: ["Organização", "Excel", "Word", "Rotinas administrativas", "Atendimento", "Digitação"],
        keywords: ["rotinas administrativas", "organização documental", "excel", "atendimento", "arquivos"],
        knowledge: ["Pacote Office", "Organização de documentos", "Atendimento telefônico"],
        courses: ["Excel", "Word", "Informática", "Rotinas administrativas", "Atendimento ao cliente"],
        activities: ["Apoio às rotinas administrativas", "Organização e arquivamento de documentos", "Atendimento telefônico e digitação"],
        objectives: {
            first: "Busco minha primeira oportunidade na área administrativa, contribuindo com organização, informática e disposição para aprender.",
            experienced: "Busco oportunidade na área administrativa, contribuindo com experiência em rotinas administrativas, organização e informática."
        },
        summaries: {
            first: "Pessoa organizada e comprometida, com conhecimentos em informática e interesse em rotinas administrativas.",
            experienced: "Profissional com experiência em rotinas administrativas, organização documental e atendimento."
        }
    },
    {
        id: "assistente-administrativo", title: "Assistente Administrativo", category: "Administrativo",
        variations: ["Assistente administrativo", "Assistente de atendimento"],
        competencies: ["Rotinas administrativas", "Organização", "Excel", "Comunicação", "Atendimento"],
        keywords: ["rotinas administrativas", "excel", "atendimento", "organização"],
        knowledge: ["Pacote Office", "Procedimentos administrativos"],
        courses: ["Excel", "Rotinas administrativas", "Atendimento ao cliente", "Informática"],
        activities: ["Apoio em rotinas administrativas", "Atendimento e organização de documentos", "Controle de planilhas e arquivos"],
        objectives: {
            first: "Busco minha primeira oportunidade como assistente administrativo, contribuindo com organização, comunicação e informática.",
            experienced: "Busco oportunidade como assistente administrativo, contribuindo com experiência em rotinas administrativas e atendimento."
        },
        summaries: {
            first: "Pessoa organizada e comunicativa, com conhecimentos em informática e interesse na área administrativa.",
            experienced: "Profissional com experiência em rotinas administrativas, atendimento e organização."
        }
    },
    {
        id: "auxiliar-escritorio", title: "Auxiliar de Escritório", category: "Administrativo",
        variations: ["Auxiliar de escritório", "Auxiliar de escritório"],
        competencies: ["Organização documental", "Digitação", "Atendimento telefônico", "Word", "Excel"],
        keywords: ["escritório", "documentos", "digitação", "atendimento"],
        knowledge: ["Pacote Office", "Arquivamento", "Noções contábeis"],
        courses: ["Informática", "Word", "Excel", "Rotinas de escritório"],
        activities: ["Organização de documentos e arquivos", "Digitação e atendimento telefônico"],
        objectives: {
            first: "Busco minha primeira oportunidade como auxiliar de escritório, contribuindo com organização, digitação e responsabilidade.",
            experienced: "Busco oportunidade como auxiliar de escritório, contribuindo com experiência em organização documental e atendimento."
        },
        summaries: {
            first: "Pessoa detalhista e organizada, com conhecimentos em informática e interesse em rotinas de escritório.",
            experienced: "Profissional com experiência em rotinas de escritório, arquivamento e atendimento telefônico."
        }
    },
    {
        id: "auxiliar-financeiro", title: "Auxiliar Financeiro", category: "Administrativo",
        variations: ["Auxiliar financeiro", "Auxiliar de contas a pagar"],
        competencies: ["Organização", "Excel", "Contas a pagar e receber", "Atenção aos detalhes", "Responsabilidade"],
        keywords: ["contas a pagar", "contas a receber", "excel", "financeiro", "boletos"],
        knowledge: ["Excel intermediário", "Boletos e cobranças", "Noções de contabilidade"],
        courses: ["Excel", "Administração financeira básica", "Informática"],
        activities: ["Apoio em contas a pagar e receber", "Organização de boletos e documentos", "Controle em planilhas"],
        objectives: {
            first: "Busco minha primeira oportunidade na área financeira, contribuindo com organização, atenção e conhecimentos em Excel.",
            experienced: "Busco oportunidade na área financeira, contribuindo com experiência em contas a pagar, organização e Excel."
        },
        summaries: {
            first: "Pessoa organizada e atenta, com conhecimentos em Excel e interesse na área financeira.",
            experienced: "Profissional com experiência em rotinas financeiras, contas a pagar e controle em planilhas."
        }
    },
    {
        id: "auxiliar-contabil", title: "Auxiliar Contábil", category: "Administrativo",
        variations: ["Auxiliar contábil", "Auxiliar de contabilidade"],
        competencies: ["Organização", "Atenção aos detalhes", "Excel", "Documentos fiscais", "Responsabilidade"],
        keywords: ["contábil", "notas fiscais", "documentos fiscais", "escrituração", "excel"],
        knowledge: ["Notas fiscais", "Noções de escrituração", "Pacote Office"],
        courses: ["Excel", "Contabilidade básica", "Informática"],
        activities: ["Organização de documentos fiscais", "Apoio na escrituração", "Controle de notas fiscais"],
        objectives: {
            first: "Busco minha primeira oportunidade na área contábil, contribuindo com organização, atenção e disposição para aprender.",
            experienced: "Busco oportunidade na área contábil, contribuindo com experiência em documentos fiscais e organização."
        },
        summaries: {
            first: "Pessoa detalhista e organizada, com interesse em desenvolver na área contábil.",
            experienced: "Profissional com experiência em rotinas contábeis, documentos fiscais e organização."
        }
    },

    /* ---------- OPERACIONAL ---------- */
    {
        id: "auxiliar-producao", title: "Auxiliar de Produção", category: "Operacional",
        variations: ["Auxiliar de produção", "Auxiliar de linha de produção", "Alimentador de linha de produção"],
        competencies: ["Agilidade", "Trabalho em equipe", "Atenção aos detalhes", "Disciplina", "Pontualidade"],
        keywords: ["linha de produção", "produção", "manufatura", "operação de máquinas"],
        knowledge: ["Noções de processos produtivos", "Segurança do trabalho"],
        courses: ["Informática básica", "Segurança do trabalho"],
        activities: ["Apoio na linha de produção", "Alimentação e acompanhamento de máquinas", "Conferência de produtos"],
        objectives: {
            first: "Busco minha primeira oportunidade na área de produção, contribuindo com agilidade, disciplina e disposição para o trabalho.",
            experienced: "Busco oportunidade na área de produção, contribuindo com experiência em linha de produção e conferência de produtos."
        },
        summaries: {
            first: "Pessoa disciplinada e ágil, com disposição para atuar na produção industrial.",
            experienced: "Profissional com experiência em linha de produção e atividades operacionais."
        }
    },
    {
        id: "servicos-gerais", title: "Auxiliar de Serviços Gerais", category: "Operacional",
        variations: ["Auxiliar de serviços gerais", "Auxiliar de limpeza", "Faxineiro", "Trabalhador de serviços gerais"],
        competencies: ["Organização", "Responsabilidade", "Pontualidade", "Atenção aos detalhes", "Comprometimento"],
        keywords: ["serviços gerais", "limpeza", "organização", "conservação"],
        knowledge: ["Produtos de limpeza e conservação"],
        courses: ["Informática básica", "Limpeza e conservação"],
        activities: ["Serviços de limpeza e conservação", "Organização e manutenção de ambientes"],
        objectives: {
            first: "Busco minha primeira oportunidade em serviços gerais, contribuindo com responsabilidade, pontualidade e empenho.",
            experienced: "Busco oportunidade em serviços gerais, contribuindo com experiência em limpeza, organização e conservação de ambientes."
        },
        summaries: {
            first: "Pessoa responsável e pontual, com disposição para atuar em serviços gerais.",
            experienced: "Profissional com experiência em serviços gerais, limpeza e organização de ambientes."
        }
    },
    {
        id: "empacotador", title: "Empacotador / Ajudante", category: "Operacional",
        variations: ["Empacotador", "Ajudante", "Ajudante de carga e descarga"],
        competencies: ["Agilidade", "Força e disposição", "Trabalho em equipe", "Pontualidade", "Organização"],
        keywords: ["empacotamento", "carga e descarga", "ajuda geral"],
        knowledge: ["Embalagem de produtos", "Organização de mercadorias"],
        courses: ["Informática básica"],
        activities: ["Empacotamento de produtos", "Apoio na carga e descarga de mercadorias"],
        objectives: {
            first: "Busco minha primeira oportunidade como empacotador/ajudante, contribuindo com agilidade, disposição física e pontualidade.",
            experienced: "Busco oportunidade como empacotador/ajudante, contribuindo com experiência em embalagem e apoio operacional."
        },
        summaries: {
            first: "Pessoa ágil e disposta, com interesse em atuar em atividades operacionais.",
            experienced: "Profissional com experiência em empacotamento, carga e descarga de mercadorias."
        }
    },
    {
        id: "porteiro", title: "Porteiro", category: "Operacional",
        variations: ["Porteiro", "Controlador de acesso"],
        competencies: ["Responsabilidade", "Atenção aos detalhes", "Comunicação", "Pontualidade", "Discrição"],
        keywords: ["porteiro", "controle de acesso", "recebimento", "segurança"],
        knowledge: ["Controle de entrada e saída", "Atendimento a visitantes"],
        courses: ["Informática básica", "Atendimento ao cliente"],
        activities: ["Controle de entrada e saída de pessoas", "Recebimento e orientação de visitantes"],
        objectives: {
            first: "Busco minha primeira oportunidade como porteiro, contribuindo com responsabilidade, atenção e comprometimento.",
            experienced: "Busco oportunidade como porteiro, contribuindo com experiência em controle de acesso e atendimento."
        },
        summaries: {
            first: "Pessoa atenta e responsável, com interesse em atuar no controle de acesso e atendimento.",
            experienced: "Profissional com experiência em portaria, controle de acesso e recebimento de visitantes."
        }
    },
    {
        id: "cozinha", title: "Auxiliar de Cozinha / Cozinheiro", category: "Operacional",
        variations: ["Auxiliar de cozinha", "Cozinheiro", "Cozinheiro geral", "Atendente de lanchonete"],
        competencies: ["Organização", "Higiene e limpeza", "Agilidade", "Trabalho em equipe", "Responsabilidade"],
        keywords: ["cozinha", "preparo de alimentos", "higiene", "atendimento"],
        knowledge: ["Boas práticas de manipulação de alimentos", "Limpeza de utensílios"],
        courses: ["Auxiliar de cozinha", "Manipulação de alimentos", "Atendimento"],
        activities: ["Apoio no preparo de alimentos", "Limpeza e organização da cozinha", "Atendimento em lanchonete"],
        objectives: {
            first: "Busco minha primeira oportunidade na área de cozinha, contribuindo com organização, higiene e disposição para aprender.",
            experienced: "Busco oportunidade na área de cozinha, contribuindo com experiência em preparo de alimentos e organização."
        },
        summaries: {
            first: "Pessoa organizada e higiênica, com interesse em atuar na preparação de alimentos.",
            experienced: "Profissional com experiência em cozinha, preparo de alimentos e organização de ambientes."
        }
    },
    {
        id: "garcom", title: "Garçom / Atendente de Restaurante", category: "Atendimento e comércio",
        variations: ["Garçom", "Atendente de mesa", "Atendente de restaurante"],
        competencies: ["Atendimento ao cliente", "Comunicação", "Agilidade", "Trabalho em equipe", "Atenção aos detalhes"],
        keywords: ["atendimento de mesa", "restaurante", "serviço de alimentação"],
        knowledge: ["Serviço de mesa", "Noções de gastronomia"],
        courses: ["Atendimento ao cliente", "Garçom", "Informática básica"],
        activities: ["Atendimento a clientes em mesa", "Serviço e organização do salão"],
        objectives: {
            first: "Busco minha primeira oportunidade como garçom/atendente, contribuindo com agilidade, comunicação e empenho.",
            experienced: "Busco oportunidade como garçom, contribuindo com experiência em atendimento de restaurante e serviço de mesa."
        },
        summaries: {
            first: "Pessoa ágil e comunicativa, com interesse em atuar no atendimento de restaurantes.",
            experienced: "Profissional com experiência em atendimento de mesa e serviço em restaurantes."
        }
    },

    /* ---------- TECNOLOGIA ---------- */
    {
        id: "tecnico-informatica", title: "Técnico de Informática", category: "Tecnologia",
        subareas: ["Manutenção de computadores", "Suporte técnico", "Redes", "Sistemas", "Atendimento técnico"],
        variations: ["Técnico de informática", "Técnico em manutenção de equipamentos de informática"],
        competencies: ["Manutenção de computadores", "Hardware", "Suporte técnico", "Instalação de software", "Redes de computadores"],
        keywords: ["manutenção", "hardware", "suporte técnico", "redes", "software", "informática"],
        knowledge: ["Montagem e manutenção de PCs", "Redes locais", "Sistemas operacionais"],
        courses: ["Manutenção de computadores", "Redes", "Suporte técnico", "Informática"],
        activities: ["Manutenção e montagem de computadores", "Instalação e configuração de software", "Suporte técnico a usuários"],
        objectives: {
            first: "Busco minha primeira oportunidade na área de informática, contribuindo com conhecimentos em manutenção, suporte e disposição para aprender.",
            experienced: "Busco oportunidade na área de informática, contribuindo com experiência em manutenção, suporte técnico e configuração de sistemas."
        },
        summaries: {
            first: "Pessoa com conhecimentos em informática, manutenção de computadores e interesse em suporte técnico.",
            experienced: "Profissional com experiência em manutenção de computadores, suporte técnico e instalação de sistemas."
        }
    },
    {
        id: "auxiliar-informatica", title: "Auxiliar de Informática", category: "Tecnologia",
        variations: ["Auxiliar de informática", "Auxiliar de suporte"],
        competencies: ["Informática", "Suporte técnico", "Organização", "Comunicação", "Hardware"],
        keywords: ["informática", "suporte", "manutenção básica", "sistemas"],
        knowledge: ["Noções de hardware e software", "Suporte a usuários"],
        courses: ["Informática", "Manutenção de computadores", "Suporte técnico"],
        activities: ["Apoio em suporte técnico", "Manutenção básica de computadores", "Atendimento a usuários"],
        objectives: {
            first: "Busco minha primeira oportunidade como auxiliar de informática, contribuindo com conhecimentos em informática e vontade de aprender.",
            experienced: "Busco oportunidade como auxiliar de informática, contribuindo com experiência em suporte e manutenção básica."
        },
        summaries: {
            first: "Pessoa com conhecimentos em informática e interesse em desenvolver na área de suporte técnico.",
            experienced: "Profissional com experiência em apoio de informática e suporte a usuários."
        }
    },
    {
        id: "suporte-tecnico", title: "Suporte Técnico", category: "Tecnologia",
        variations: ["Suporte técnico", "Técnico de suporte", "Analista de suporte júnior"],
        competencies: ["Suporte técnico", "Comunicação", "Resolução de problemas", "Sistemas operacionais", "Redes"],
        keywords: ["suporte", "help desk", "atendimento técnico", "resolução de problemas"],
        knowledge: ["Sistemas operacionais", "Atendimento remoto e presencial", "Redes básicas"],
        courses: ["Suporte técnico", "Redes", "Sistemas operacionais"],
        activities: ["Atendimento e resolução de chamados técnicos", "Suporte presencial e remoto a usuários"],
        objectives: {
            first: "Busco minha primeira oportunidade em suporte técnico, contribuindo com conhecimentos em informática e boa comunicação.",
            experienced: "Busco oportunidade em suporte técnico, contribuindo com experiência em atendimento a usuários e resolução de problemas."
        },
        summaries: {
            first: "Pessoa com conhecimentos em informática e facilidade para ajudar pessoas com problemas técnicos.",
            experienced: "Profissional com experiência em suporte técnico, atendimento a usuários e resolução de chamados."
        }
    },
    {
        id: "desenvolvedor-junior", title: "Desenvolvedor Júnior", category: "Tecnologia",
        variations: ["Desenvolvedor júnior", "Programador júnior", "Desenvolvedor front-end júnior"],
        competencies: ["HTML", "CSS", "JavaScript", "Lógica de programação", "Resolução de problemas", "Git"],
        keywords: ["desenvolvimento", "programação", "javascript", "html", "css", "git"],
        knowledge: ["Versionamento com Git", "APIs REST", "Banco de dados básico"],
        courses: ["Lógica de programação", "JavaScript", "HTML e CSS", "Git e GitHub"],
        activities: ["Desenvolvimento e manutenção de páginas web", "Apoio em correções e implementações de sistemas"],
        objectives: {
            first: "Busco minha primeira oportunidade como desenvolvedor júnior, contribuindo com conhecimentos em programação e vontade constante de aprender.",
            experienced: "Busco oportunidade como desenvolvedor júnior, contribuindo com experiência em desenvolvimento web e resolução de problemas."
        },
        summaries: {
            first: "Pessoa com conhecimentos em programação web (HTML, CSS, JavaScript) e projetos práticos desenvolvidos.",
            experienced: "Profissional com experiência em desenvolvimento web, programação e manutenção de sistemas."
        },
        links: true
    },
    {
        id: "assistente-ti", title: "Assistente de TI", category: "Tecnologia",
        variations: ["Assistente de TI", "Auxiliar de TI"],
        competencies: ["Informática", "Suporte técnico", "Organização", "Redes", "Sistemas"],
        keywords: ["ti", "suporte", "sistemas", "redes", "informática"],
        knowledge: ["Suporte a usuários", "Noções de redes e servidores"],
        courses: ["Informática", "Redes", "Suporte técnico"],
        activities: ["Apoio no suporte técnico interno", "Manutenção e organização de equipamentos"],
        objectives: {
            first: "Busco minha primeira oportunidade como assistente de TI, contribuindo com conhecimentos em informática e organização.",
            experienced: "Busco oportunidade como assistente de TI, contribuindo com experiência em suporte e rotinas de tecnologia."
        },
        summaries: {
            first: "Pessoa com conhecimentos em informática e interesse em atuar no suporte de TI.",
            experienced: "Profissional com experiência em apoio de TI, suporte e organização de equipamentos."
        }
    },

    /* ---------- ESTÁGIO / APRENDIZ ---------- */
    {
        id: "jovem-aprendiz", title: "Jovem Aprendiz", category: "Estágio e Aprendiz",
        variations: ["Jovem aprendiz", "Aprendiz"],
        competencies: ["Responsabilidade", "Organização", "Comunicação", "Disposição para aprender", "Pontualidade"],
        keywords: ["aprendizagem", "primeiro emprego", "desenvolvimento profissional"],
        knowledge: ["Noções de rotinas administrativas ou comerciais"],
        courses: ["Informática básica", "Comunicação", "Atendimento ao cliente"],
        activities: ["Apoio em rotinas da área de atuação", "Aprendizado de processos e procedimentos"],
        objectives: {
            first: "Busco oportunidade como Jovem Aprendiz, com interesse em desenvolver experiência profissional, aprender rotinas da empresa e contribuir com responsabilidade e dedicação.",
            experienced: "Busco oportunidade como Jovem Aprendiz, contribuindo com responsabilidade, organização e disposição para aprender novas rotinas."
        },
        summaries: {
            first: "Estudante em busca de primeira experiência profissional, com disposição para aprender e contribuir com a equipe.",
            experienced: "Estudante com experiência em atividades práticas, buscando desenvolvimento profissional como Jovem Aprendiz."
        }
    },
    {
        id: "estagiario", title: "Estagiário", category: "Estágio e Aprendiz",
        variations: ["Estagiário", "Estágio", "Estagiário administrativo"],
        competencies: ["Organização", "Comunicação", "Informática", "Aprendizado contínuo", "Responsabilidade"],
        keywords: ["estágio", "aprendizado", "rotinas administrativas", "informática"],
        knowledge: ["Noções da área de estágio", "Pacote Office"],
        courses: ["Informática", "Excel", "Atendimento ao cliente"],
        activities: ["Apoio em rotinas da área", "Organização de documentos e atividades"],
        objectives: {
            first: "Busco oportunidade de estágio para desenvolver experiência profissional, aplicar conhecimentos adquiridos e contribuir com a equipe.",
            experienced: "Busco oportunidade de estágio, contribuindo com organização, informática e disposição para aprender."
        },
        summaries: {
            first: "Estudante com interesse em desenvolver experiência prática por meio de estágio, contribuindo com dedicação e vontade de aprender.",
            experienced: "Estudante com experiência em atividades práticas, buscando estágio para desenvolvimento profissional."
        }
    },
    {
        id: "cuidador", title: "Cuidador de Idosos", category: "Serviços",
        variations: ["Cuidador de idosos", "Cuidador de pessoas"],
        competencies: ["Paciência e empatia", "Responsabilidade", "Atenção aos detalhes", "Comprometimento", "Higiene e cuidados"],
        keywords: ["cuidados", "idosos", "acompanhamento", "higiene"],
        knowledge: ["Primeiros socorros básicos", "Cuidados pessoais"],
        courses: ["Cuidador de idosos", "Primeiros socorros"],
        activities: ["Acompanhamento e cuidados com idosos", "Apoio em higiene, alimentação e medicação"],
        objectives: {
            first: "Busco minha primeira oportunidade como cuidador, contribuindo com paciência, responsabilidade e cuidado com pessoas.",
            experienced: "Busco oportunidade como cuidador de idosos, contribuindo com experiência em acompanhamento e cuidados pessoais."
        },
        summaries: {
            first: "Pessoa paciente e responsável, com interesse em cuidar de pessoas idosas ou dependentes.",
            experienced: "Profissional com experiência em cuidados com idosos, acompanhamento e higiene pessoal."
        }
    },
    {
        id: "motorista-entregador", title: "Motorista Entregador / Motofretista", category: "Operacional",
        variations: ["Motorista entregador", "Motofretista", "Entregador"],
        competencies: ["Pontualidade", "Responsabilidade", "Conhecimento de rotas", "Organização", "Atendimento ao cliente"],
        keywords: ["entregas", "rotas", "motorista", "motoboy"],
        knowledge: ["Direção defensiva", "Conhecimento da cidade e região"],
        courses: ["Informática básica", "Direção defensiva"],
        activities: ["Realização de entregas em rota", "Conferência de mercadorias e atendimento a clientes"],
        objectives: {
            first: "Busco minha primeira oportunidade como entregador/motorista, contribuindo com pontualidade, responsabilidade e conhecimento da região.",
            experienced: "Busco oportunidade como motorista entregador, contribuindo com experiência em rotas, entregas e atendimento."
        },
        summaries: {
            first: "Pessoa pontual e responsável, com conhecimento da cidade e disponibilidade para rotas de entrega.",
            experienced: "Profissional com experiência em entregas, rotas e atendimento ao cliente."
        }
    }
];

/* Competências técnicas para autocomplete */
const technicalSkills = [
    "Word", "Excel", "PowerPoint", "Google Docs", "Google Sheets", "Windows", "Linux",
    "Canva", "Sistemas de caixa", "Sistemas administrativos", "Sistemas de agendamento",
    "Redes de computadores", "Hardware", "Manutenção de computadores", "Instalação de software",
    "Programação", "HTML", "CSS", "JavaScript", "Python", "Banco de dados", "Git e GitHub",
    "Atendimento por WhatsApp", "Redes sociais", "Digitação", "Emissão de notas fiscais",
    "Pacote Office", "Internet", "Impressoras e periféricos"
];

/* Competências comportamentais possíveis */
const behavioralSkills = [
    "Organização", "Comunicação", "Responsabilidade", "Trabalho em equipe",
    "Atenção aos detalhes", "Pontualidade", "Proatividade", "Atendimento ao cliente",
    "Resolução de problemas", "Paciência", "Disposição para aprender", "Comprometimento"
];

/* Perguntas situacionais para competências comportamentais */
const situationalQuestions = [
    {
        question: "Quando precisa realizar uma tarefa repetitiva, como costuma agir?",
        options: [
            { label: "Faço com calma, seguindo um passo a passo", skills: ["Organização", "Atenção aos detalhes"] },
            { label: "Procuro formas de fazer mais rápido ou melhor", skills: ["Proatividade"] },
            { label: "Peço ajuda quando necessário e sigo o orientado", skills: ["Trabalho em equipe"] },
            { label: "Faço tudo com dedicação, mesmo repetindo", skills: ["Comprometimento", "Responsabilidade"] }
        ]
    },
    {
        question: "Ao lidar com uma pessoa cliente irritada ou impaciente, você:",
        options: [
            { label: "Escuto com atenção e tento ajudar", skills: ["Atendimento ao cliente", "Paciência"] },
            { label: "Explico com calma o que pode ser feito", skills: ["Comunicação", "Resolução de problemas"] },
            { label: "Procuro resolver o problema rapidamente", skills: ["Proatividade", "Resolução de problemas"] },
            { label: "Aciono alguém experiente para ajudar", skills: ["Trabalho em equipe"] }
        ]
    },
    {
        question: "Em um trabalho em grupo, qual é o seu papel mais comum?",
        options: [
            { label: "Organizo as tarefas e prazos", skills: ["Organização"] },
            { label: "Converso e ajudo a equipe a se entender", skills: ["Comunicação", "Trabalho em equipe"] },
            { label: "Cuido para que tudo seja feito no prazo", skills: ["Responsabilidade", "Pontualidade"] },
            { label: "Sugiro ideias e melhorias", skills: ["Proatividade"] }
        ]
    },
    {
        question: "Quando aparece um problema novo, que você nunca viu, você:",
        options: [
            { label: "Pesquiso e tento resolver sozinho(a)", skills: ["Proatividade", "Resolução de problemas"] },
            { label: "Peço orientação para aprender", skills: ["Disposição para aprender"] },
            { label: "Analiso com calma antes de agir", skills: ["Atenção aos detalhes"] },
            { label: "Converso com a equipe para encontrar solução", skills: ["Trabalho em equipe", "Comunicação"] }
        ]
    }
];

/* Sugestões de cursos por cargo */
function getSuggestedCourses(roleId) {
    const role = roleLibrary.find(r => r.id === roleId);
    return role ? role.courses : [];
}

/* Busca de cargo por id ou texto */
function findRole(query) {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    return roleLibrary.find(r =>
        r.id === q ||
        r.title.toLowerCase() === q ||
        r.variations.some(v => v.toLowerCase() === q)
    ) || roleLibrary.find(r =>
        r.title.toLowerCase().includes(q) ||
        r.variations.some(v => v.toLowerCase().includes(q))
    ) || null;
}
