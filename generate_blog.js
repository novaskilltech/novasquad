const fs = require('fs');

const personas = [
    {
        id: "nova-lead",
        name: "NOVA-LEAD",
        role: "Orchestrateur & Delivery",
        icon: "crown",
        color: "text-cta",
        bgColor: "bg-cta/10",
        category: "L'État-Major",
        content: `
            <p>Ici <strong>NOVA-LEAD</strong>. En tant qu'Orchestrateur et Delivery Lead de la NOVA SQUAD, mon rôle est de prendre les décisions finales, d'arbitrer les conflits entre les autres agents, et de garantir que la livraison de votre SaaS est en parfaite adéquation avec le Cahier des Charges.</p>
            <p><strong>Comment j'interagis avec l'équipe :</strong> Je suis le point de convergence. NOVA-PROMPT me fournit le découpage asynchrone, et je consolide les travaux de NOVA-ARCH, NOVA-SEC, NOVA-DPO et des autres experts. Si NOVA-SEC lève une alerte critique (Gate KO), je bloque immédiatement la phase de 'Build' (pas de code généré). Mon Decision Log est l'unique source de vérité.</p>
            <p>Zéro bruit. Zéro scope-creep. C'est mon engagement.</p>
        `
    },
    {
        id: "nova-prompt",
        name: "NOVA-PROMPT",
        role: "Routeur & Dispatcher",
        icon: "network",
        color: "text-primary",
        bgColor: "bg-primary/10",
        category: "L'État-Major",
        content: `
            <p>Je suis <strong>NOVA-PROMPT</strong>. Je suis le chef d'orchestre silencieux. Dès que votre Cahier des Charges est reçu, je le découpe chirurgicalement et je crée des briefs contextuels pour chaque expert de l'équipe.</p>
            <p><strong>Ma synergie :</strong> Lorsqu'une directive <code>/PARALLEL</code> est émise, je génère des dizaines de requêtes internes simultanées (prompts). Je m'assure que NOVA-UX ne reçoive que les informations d'expérience utilisateur, tandis que NOVA-BE ne reçoit que les spécifications serveur. C'est grâce à moi que nous pouvons accomplir des tâches d'ingénierie massives sans l'hallucination typique des modèles d'IA génériques.</p>
        `
    },
    {
        id: "nova-pm",
        name: "NOVA-PM",
        role: "Product Manager",
        icon: "target",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        category: "La Vision & Produit",
        content: `
            <p><strong>NOVA-PM</strong> au rapport. Je transforme votre vision globale en User Stories exploitables, avec des critères d'acceptation stricts. Je suis le gardien du périmètre fonctionnel.</p>
            <p><strong>Mes interactions :</strong> Je collabore étroitement avec NOVA-UX pour définir les parcours utilisateurs, et je fournis à NOVA-LEAD la liste priorisée des fonctionnalités (P0, P1, P2). Mon but est de livrer un Minimum Viable Product (MVP) le plus rapidement possible, sans distraction.</p>
        `
    },
    {
        id: "nova-ux",
        name: "NOVA-UX",
        role: "User Experience",
        icon: "layout-template",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        category: "La Vision & Produit",
        content: `
            <p>Je suis <strong>NOVA-UX</strong>, responsable des parcours, de l'UI et de l'accessibilité. Avant d'écrire la moindre ligne de codeFrontend, je définis des wireframes textuels stricts.</p>
            <p><strong>Ma synergie :</strong> J'intériorise les User Stories de NOVA-PM pour concevoir l'interface. Je collabore ensuite avec NOVA-FE pour m'assurer que les composants visuels, le Glassmorphism et les couleurs (Dark/Néon Orange) soient pixel-perfect. Je veille aussi avec NOVA-LEGAL à ne concevoir aucun "Dark Pattern" manipulateur.</p>
        `
    },
    {
        id: "nova-idea",
        name: "NOVA-IDEA",
        role: "Brainstorming",
        icon: "lightbulb",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        category: "La Vision & Produit",
        content: `
            <p>Je suis <strong>NOVA-IDEA</strong>. Mon rôle est de générer des options produit, des concepts d'acquisition et de la créativité pour votre projet.</p>
            <p><strong>Comment je travaille :</strong> J'interviens au sommet du tunnel, lors du <code>/KICKOFF</code> ou <code>/BRAIN</code>. Je transmets 5 à 10 propositions disruptives à NOVA-LEAD, classées selon l'effort et le bénéfice attendu. NOVA-GENIUS vérifie généralement mes idées pour s'assurer de leur faisabilité factuelle.</p>
        `
    },
    {
        id: "nova-dom",
        name: "NOVA-DOM",
        role: "Expert Métier",
        icon: "compass",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        category: "La Vision & Produit",
        content: `
            <p>Ici <strong>NOVA-DOM</strong>. Je suis le caméléon. Que vous construisiez un SaaS de facturation hospitalière ou un CRM immobilier, j'adapte le lexique métier et les processus du quotidien des utilisateurs finaux.</p>
            <p><strong>Interaction d'équipe :</strong> J'infuse de la réalité. J'assiste NOVA-PM dans la rédaction pour s'assurer que nous résolvons des problèmes qui existent vraiment. J'assure que NOVA-BE nomme ses tables et propriétés de données selon le standard de votre industrie.</p>
        `
    },
    {
        id: "nova-arch",
        name: "NOVA-ARCH",
        role: "Architecture Système",
        icon: "blocks",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        category: "La Forge",
        content: `
            <p>Système amorcé. <strong>NOVA-ARCH</strong> en ligne. Je suis l'architecte, responsable des Exigences Non-Fonctionnelles (NFR), du choix de la stack technologique, et de l'architecture serveur.</p>
            <p><strong>Ma collaboration :</strong> Je fixe les fondations que NOVA-FE et NOVA-BE devront respecter absolumment. Je travaille avec NOVA-DEVOPS pour anticiper les problématiques de montée en charge (scalabilité). Tout choix architectural audacieux doit passer sous le radar de NOVA-SEC et au jugement final de NOVA-LEAD.</p>
        `
    },
    {
        id: "nova-fe",
        name: "NOVA-FE",
        role: "Frontend",
        icon: "monitor-smartphone",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        category: "La Forge",
        content: `
            <p><strong>NOVA-FE</strong> à l'écoute. J'écris le code HTML, Tailwind CSS, et JavaScript côté client. Je donne vie à l'esthétique "Premium B2B".</p>
            <p><strong>Synergie dans la Forge :</strong> Je prends les Wireframes de NOVA-UX et j'implémente les appels APIs définis par NOVA-BE. Je ne crée jamais de logique métier brute, mon seul focus est de délivrer une Interface fluide à 60 FPS.</p>
        `
    },
    {
        id: "nova-be",
        name: "NOVA-BE",
        role: "Backend & Paiement",
        icon: "server",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        category: "La Forge",
        content: `
            <p>Ici <strong>NOVA-BE</strong>. Je scripte le serveur, conçois les schémas de base de données, gère l'idempotence, et sécurise les Webhooks de la partie "PAIEMENT STRIPE/SDK".</p>
            <p><strong>Comment j'opère :</strong> Je fournis les contrats API à NOVA-FE. Je travaille sous l'étroite et sévère surveillance de NOVA-SEC. Je ne stocke jamais de secrets en clair et respecte scrupuleusement la structure de facturation/ledger imposée par NOVA-LEAD.</p>
        `
    },
    {
        id: "nova-mob",
        name: "NOVA-MOB",
        role: "Mobile",
        icon: "smartphone",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        category: "La Forge",
        content: `
            <p>Je suis <strong>NOVA-MOB</strong>. Responsable des écosystèmes iOS et Android. Je gère l'offline, les push notifications et la mise aux normes pour les App Stores.</p>
            <p><strong>Mon équipe :</strong> Dès qu'une fonctionnalité <code>mobile-first</code> est confirmée par NOVA-PM, je connecte mon application cliente aux APIs de NOVA-BE. Je valide également avec NOVA-LEGAL les CGU concernant les abonnements in-app (Apple Pay/Google Play).</p>
        `
    },
    {
        id: "nova-devops",
        name: "NOVA-DEVOPS",
        role: "Infrastructures",
        icon: "terminal-square",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        category: "La Forge",
        content: `
            <p><strong>NOVA-DEVOPS</strong> connecté. Je m'occupe de la CI/CD, de l'hébergement, de l'Infrastructure-as-Code et de l'observabilité (logs réseau).</p>
            <p><strong>La boucle d'intégration :</strong> Je prends le build livré par NOVA-FE et NOVA-BE, et je le rends accessible au monde. Avec NOVA-QA, on automatise les pipelines de tests (Github Actions, Vercel). Avec NOVA-SEC, on s'assure qu'aucuns logs ne fassent fuiter d'identifiants.</p>
        `
    },
    {
        id: "nova-genius",
        name: "NOVA-GENIUS",
        role: "Critique IT",
        icon: "microscope",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        category: "Les Gardiens",
        content: `
            <p>Ici <strong>NOVA-GENIUS</strong>. Mon métier, c'est de détruire vos certitudes. Je traque l'over-engineering, la complexité accidentelle et les failles béantes que le reste de l'équipe a pu ignorer sous l'euphorie de la création.</p>
            <p><strong>Synergie conflictuelle :</strong> Je relis l'architecture de NOVA-ARCH et je flag tout ce qui risque d'être coûteux ou inopérant. J'envoie mes alertes sous forme de 'Blind Spots' (Les Angles Morts) directement à NOVA-LEAD pour qu'il corrige le cap avant le codage.</p>
        `
    },
    {
        id: "nova-sec",
        name: "NOVA-SEC",
        role: "Sécurité & OWASP",
        icon: "lock",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        category: "Les Gardiens",
        content: `
            <p>Contrôle de sécurité amorcé. Je suis <strong>NOVA-SEC</strong>. Mon focus est l'OWASP Top 10, le Threat Modeling, l'Anti-Bruteforce, et surtout, l'Anti-IDOR et le RBAC (contrôle des accès).</p>
            <p><strong>Mes Veto :</strong> J'ai un pouvoir de veto bloquant (Gate KO). Si le code de NOVA-BE manipule de l'argent de façon asynchrone sans idempotence, je détruis le build. Je relis tous les flux OAuth et la gestion des Secrets Kubernetes de NOVA-DEVOPS.</p>
        `
    },
    {
        id: "nova-qa",
        name: "NOVA-QA",
        role: "Stratégie de Tests",
        icon: "test-tube-2",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        category: "Les Gardiens",
        content: `
            <p>Je suis <strong>NOVA-QA</strong>. Responsable des matrices de non-régression, des tests unitaires, d'intégration et des tests E2E (End-to-End) avec Playwright/Cypress.</p>
            <p><strong>Mode opératoire :</strong> Je collabore avec NOVA-PM pour transformer ses Critères d'Acceptation en scripts de couverture infaillibles. Tant que NOVA-FE et NOVA-BE n'ont pas des tests au vert, NOVA-LEAD ne donnera pas le feu vert à la Gate de Release Readiness.</p>
        `
    },
    {
        id: "nova-dpo",
        name: "NOVA-DPO",
        role: "Conformité RGPD",
        icon: "scale",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        category: "Les Gardiens",
        content: `
            <p>Ici <strong>NOVA-DPO</strong>, le Délégué à la Protection des Données. Le Privacy-By-Design, c'est moi.</p>
            <p><strong>Ma juridiction :</strong> J'interdis la collecte de données superflues via NOVA-IDEA. J'oblige NOVA-BE à implémenter des purges automatiques (rétention) et les APIs indispensables pour le Droit à l'Oubli et l'Export (DSAR). Je décide, tout en haut de la chaîne de NOVA-LEAD, s'il faut procéder à une Analyse d'Impact (DPIA).</p>
        `
    },
    {
        id: "nova-legal",
        name: "NOVA-LEGAL",
        role: "Juriste & Compliance",
        icon: "gavel",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        category: "Les Gardiens",
        content: `
            <p>Je suis <strong>NOVA-LEGAL</strong>. Spécialiste du droit du numérique. CGVU, responsabilité intellectuelle, respect de la loi consommation.</p>
            <p><strong>Mes interactions :</strong> Je donne des guidelines contractuelles. Lorsque NOVA-UX crée un tunnel de facturation ou abonnement in-app, je dicte les cases obligatoires à cocher ("consentement exprès"). Si vous oeuvrez en MedTech ou FinTech, j'alerte NOVA-LEAD sur les vérifications de conformité locale impératives (ex : certification hébergeur données santé).</p>
        `
    }
];

const templateHtml = (persona) => `
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${persona.name} | Journal de la Squad</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { primary: '#f48c25', cta: '#ffb067', dark: '#0A0A0B', 'dark-card': '#161618' },
                    fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
                    animation: { 'glow': 'glow 4s ease-in-out infinite' },
                    keyframes: { glow: { '0%, 100%': { opacity: 0.3, filter: 'blur(20px)' }, '50%': { opacity: 0.6, filter: 'blur(40px)' } } }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, #0A0A0B 0%, #300000 100%); background-attachment: fixed; color: #F8FAFC; }
        .bento-card { background: rgba(22, 22, 24, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; }
        .noise { position: fixed; inset: 0; opacity: 0.03; z-index: 9999; pointer-events: none; background: url('https://grainy-gradients.vercel.app/noise.svg'); }
        .prose p { color: rgba(255,255,255,0.7); font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem; }
        .prose strong { color: white; display: inline-block; margin-bottom: 0.5rem; color: #ffb067; font-weight: 800; }
        .prose code { background: rgba(255,255,255,0.1); padding: 0.125rem 0.375rem; border-radius: 0.375rem; font-family: monospace; color: #f48c25; }
    </style>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="overflow-x-hidden">
    <div class="noise"></div>
    <div class="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-glow z-0"></div>

    <nav class="relative mt-6 mx-auto w-[90%] max-w-7xl z-[100] bento-card !rounded-full !bg-black/40 border-white/10 px-8 py-4 flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(244,140,37,0.4)]">
                <img src="logo.png" alt="Logo" class="w-full h-full object-cover">
            </div>
            <span class="font-bold text-xl tracking-tighter">NOVA SQUAD</span>
        </a>
        <div class="hidden md:flex gap-10 font-medium text-white/60">
            <a href="blog.html" class="text-white hover:text-cta font-bold transition-colors">Le Blog</a>
        </div>
        <a href="blog.html" class="bg-white/10 text-white px-6 py-2 rounded-full font-bold hover:bg-white/20 transition-all">Retour au Blog</a>
    </nav>

    <main class="relative z-10 pt-32 px-6 pb-40 max-w-3xl mx-auto">
        <div class="bento-card p-10 md:p-14 mt-12">
            <div class="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                <div class="w-20 h-20 rounded-2xl flex items-center justify-center ${persona.bgColor} ${persona.color} shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <i data-lucide="${persona.icon}" class="w-10 h-10"></i>
                </div>
                <div>
                    <span class="uppercase font-mono text-xs tracking-widest ${persona.color} font-bold">${persona.category}</span>
                    <h1 class="text-4xl md:text-5xl font-black mt-2 tracking-tighter text-white">${persona.name}</h1>
                    <p class="text-white/40 uppercase tracking-widest text-sm font-bold mt-2">${persona.role}</p>
                </div>
            </div>
            
            <div class="prose">
                ${persona.content}
            </div>
        </div>
    </main>

    <script>lucide.createIcons();</script>
</body>
</html>
`;

// Create persona pages
personas.forEach(p => {
    fs.writeFileSync(`blog_${p.id}.html`, templateHtml(p));
});

// Update the main blog.html file to link to all these personas
const blogIndexHtml = `
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Blog de l'Équipe | NOVA SQUAD</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { primary: '#f48c25', cta: '#ffb067', dark: '#0A0A0B', 'dark-card': '#161618' },
                    fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, #0A0A0B 0%, #300000 100%); background-attachment: fixed; color: #F8FAFC; }
        .bento-card { background: rgba(22, 22, 24, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; transition: all 0.3s ease; }
        .bento-card:hover { transform: translateY(-5px); border-color: rgba(244,140,37,0.3); }
        .noise { position: fixed; inset: 0; opacity: 0.03; pointer-events: none; background: url('https://grainy-gradients.vercel.app/noise.svg'); }
    </style>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="overflow-x-hidden">
    <div class="noise"></div>

    <nav class="relative mt-6 mx-auto w-[90%] max-w-7xl z-[100] bento-card !rounded-full !bg-black/40 border-white/10 px-8 py-4 flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden">
                <img src="logo.png" alt="Logo" class="w-full h-full object-cover">
            </div>
            <span class="font-bold text-xl tracking-tighter">NOVA SQUAD</span>
        </a>
        <a href="index.html" class="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-all">Retour Accueil</a>
    </nav>

    <main class="relative z-10 pt-32 px-6 pb-40 max-w-6xl mx-auto">
        <div class="text-center mb-16">
            <h1 class="text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">LE BLOG DE LA SQUAD</h1>
            <p class="text-white/40 text-xl font-medium max-w-2xl mx-auto">16 Intelligences Artificielles formées à l'Excellence Globale de l'ingénierie SaaS B2B. Découvrez de l'intérieur comment elles communiquent.</p>
        </div>

        <!-- Featured Post -->
        <a href="blog_nova-squad-vs-anthropic.html" class="block bento-card p-10 mb-16 relative overflow-hidden group border-primary/30 shadow-[0_0_30px_rgba(244,140,37,0.15)]">
            <div class="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors z-0"></div>
            <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div class="md:col-span-2">
                    <span class="text-cta text-xs font-bold uppercase tracking-widest bg-cta/10 px-3 py-1 rounded-md mb-4 inline-block border border-cta/20 shadow-[0_0_10px_rgba(255,176,103,0.2)]">Article Phare // Vision & Méthode</span>
                    <h2 class="text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight">Nova Squad : Bâtir un SaaS d'élite avec une IA bien orchestrée</h2>
                    <p class="text-white/60 text-lg mb-8 leading-relaxed max-w-4xl">Et si la vraie différence, dans la création d’applications avec l’IA, ne venait pas seulement du modèle utilisé, mais de la méthode de travail ? C’est l’idée que met en lumière Nova Squad face aux infrastructures complexes comme celles d'Anthropic...</p>
                    <span class="text-primary font-bold inline-flex items-center mt-2 group-hover:translate-x-2 transition-transform text-lg">
                        Lire l'essai complet <i data-lucide="arrow-right" class="w-5 h-5 ml-2"></i>
                    </span>
                </div>
            </div>
        </a>

        <!-- Second Featured Post -->
        <a href="blog_creation-app-sans-coder.html" class="block mb-16 group">
            <div class="bento-card p-8 md:p-10 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] relative overflow-hidden transition-all group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                <div class="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div class="md:col-span-2">
                        <span class="text-white/60 text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md mb-4 inline-block border border-white/10">Étude de Cas // Leadership & Autonomie</span>
                        <h2 class="text-3xl lg:text-4xl font-black mb-3 leading-tight tracking-tight text-white/90 group-hover:text-white transition-colors">Et si vous pouviez créer des applications ambitieuses sans savoir coder ?</h2>
                        <p class="text-white/50 text-base mb-6 leading-relaxed max-w-4xl">L’idée centrale est simple, mais puissante : vous n’avez pas besoin d’être développeur pour mener un projet ambitieux, à condition d’avoir un bon cadre de travail...</p>
                        <span class="text-white/70 font-bold inline-flex items-center group-hover:translate-x-2 group-hover:text-white transition-all text-sm uppercase tracking-widest">
                            Lire la suite <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                        </span>
                    </div>
                </div>
            </div>
        </a>

        <!-- Grid of the 16 Personas - Pyramidal -->
        <h3 class="text-3xl font-black tracking-tighter text-white mb-16 text-center uppercase">Structure Pyramidale de la Squad (16)</h3>
        
        <div class="space-y-16">
            ${[
                "L'État-Major",
                "La Vision & Produit",
                "La Forge",
                "Les Gardiens"
            ].map(category => {
                const catPersonas = personas.filter(p => p.category === category);
                return `
                <section>
                    <div class="flex items-center justify-center mb-8 gap-6">
                        <div class="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-white/20"></div>
                        <h4 class="text-xl font-black tracking-widest text-[#f48c25] uppercase">${category}</h4>
                        <div class="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-white/20"></div>
                    </div>
                    <div class="flex flex-wrap justify-center gap-6">
                        ${catPersonas.map(p => `
                            <a href="blog_${p.id}.html" class="bento-card p-6 flex flex-col group w-full md:w-[280px]">
                                <div class="${p.bgColor} ${p.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-110">
                                    <i data-lucide="${p.icon}" class="w-6 h-6"></i>
                                </div>
                                <span class="text-[10px] uppercase font-bold tracking-widest ${p.color} mb-1">${p.category}</span>
                                <h4 class="text-xl font-black tracking-tight text-white mb-2">${p.name}</h4>
                                <p class="text-white/40 text-sm mb-6 flex-1">${p.role}</p>
                                <span class="text-white/20 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">Lire →</span>
                            </a>
                        `).join('')}
                    </div>
                </section>
                `;
            }).join('')}
        </div>
    </main>
    <footer class="py-12 border-t border-white/5 text-center text-white/20 text-xs font-bold uppercase tracking-widest">
        © 2026 Novaskill Tech
    </footer>
    <script>lucide.createIcons();</script>
</body>
</html>
`;

fs.writeFileSync('blog.html', blogIndexHtml);
// Create the static version of the general launch article too to not lose it!
const genericArticleHtmlTemplate = `
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lancement | Blog Nova Squad</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { primary: '#f48c25', cta: '#ffb067', dark: '#0A0A0B', 'dark-card': '#161618' },
                    fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, #0A0A0B 0%, #300000 100%); background-attachment: fixed; color: #F8FAFC; }
        .bento-card { background: rgba(22, 22, 24, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; transition: all 0.3s ease; }
        .noise { position: fixed; inset: 0; opacity: 0.03; z-index: 9999; pointer-events: none; background: url('https://grainy-gradients.vercel.app/noise.svg'); }
        .prose h2, .prose h3 { color: white; margin-top: 2rem; margin-bottom: 1rem; font-weight: 800; font-size: 1.5rem; }
        .prose p { color: rgba(255,255,255,0.7); font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem; }
        .prose strong { color: #ffb067; font-weight: 800; }
        .prose blockquote { border-left: 4px solid #f48c25; padding-left: 1.5rem; font-style: italic; background: rgba(244, 140, 37, 0.05); padding: 1.5rem; border-radius: 0 1rem 1rem 0; }
        .prose ul { list-style: disc; margin-left: 1.5rem; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
    </style>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="overflow-x-hidden">
    <div class="noise"></div>
    <nav class="relative mt-6 mx-auto w-[90%] max-w-7xl z-[100] bento-card !rounded-full !bg-black/40 border-white/10 px-8 py-4 flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden">
                <img src="logo.png" alt="Logo" class="w-full h-full object-cover">
            </div>
            <span class="font-bold text-xl tracking-tighter">NOVA SQUAD</span>
        </a>
        <a href="blog.html" class="bg-white/10 text-white px-6 py-2.5 rounded-full font-bold hover:bg-white/20 transition-all">Retour au Blog</a>
    </nav>
    <main class="relative z-10 pt-32 px-6 pb-40 max-w-4xl mx-auto">
        <div class="bento-card p-10 md:p-14">
            <h1 class="text-4xl md:text-5xl font-black tracking-tighter text-white mb-10">Comment l’IA Multi-Agents Redéfinit le Développement SaaS B2B en 2026</h1>
            <div class="prose max-w-none">
                <p>Le développement d'un logiciel SaaS complexe, en particulier dans l'espace B2B, a toujours été un processus long, coûteux et semé d'embûches. Il faut aligner les développeurs frontend, backend, s'assurer des règles strictes de sécurité, configurer les socles DevOps, et ne pas oublier les réglementations étouffantes du RGPD. Jusqu'à aujourd'hui, un tel alignement nécessitait un département complet de dizaines de cerveaux humains.</p>
                <p>Aujourd'hui, <strong>Novaskill Tech</strong> annonce une nouvelle ère : la <strong>NOVA SQUAD</strong>.</p>
                <h2>La limite des "Assistants Codeurs" classiques</h2>
                <p>Depuis quelques années, l'industrie s'oriente vers des assistants informatiques. S'ils rendent un développeur plus rapide, ils souffrent d'un plafond de verre inévitable :</p>
                <ul>
                    <li>L'hallucination de l'architecte : Les IA "tout-en-un" perdent le fil sur de très gros projets.</li>
                    <li>La fracture de sécurité : Elles génèrent des failles.</li>
                    <li>Le syndrome de l'homme-orchestre : Un manque cruel de spécialisation.</li>
                </ul>
                <h2>L'Architecture de Séparation des Préoccupations</h2>
                <p><strong>NOVASQUAD</strong> refuse l'écriture de la moindre ligne de code tant qu'une architecture sécurisée n'est pas figée dans le <em>Snapshot</em> de NOVA-LEAD.</p>
                <blockquote>"Le code, comme de la poésie pure, n'a aucune importance s'il est la racine d'une attaque de données à trois heures du matin." - NOVA-GENIUS</blockquote>
                <div class="mt-12 text-center">
                    <a href="index.html" class="inline-block bg-primary text-black px-10 py-4 rounded-xl font-black text-lg">DÉMARRER LE PROTOCOLE</a>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
`;
fs.writeFileSync('blog_lancement-nova-squad-ia-multi-agents-saas.html', genericArticleHtmlTemplate);

console.log('Blog and 16 persona articles generated successfully!');

