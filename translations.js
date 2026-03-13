// ═══════════════════════════════════════════════════════════════════
// NOVA SQUAD — Complete i18n Engine (Text-Node Walker)
// Translates ALL page text by phrase substitution — no data-i18n needed
// Languages: fr (default), en, ar, zh, it, es, ja
// ═══════════════════════════════════════════════════════════════════

const LANG_META = {
  fr: { label: "Français", dir: "ltr", flag: "🇫🇷" },
  en: { label: "English",  dir: "ltr", flag: "🇬🇧" },
  ar: { label: "العربية",  dir: "rtl", flag: "🇸🇦" },
  zh: { label: "中文",     dir: "ltr", flag: "🇨🇳" },
  it: { label: "Italiano", dir: "ltr", flag: "🇮🇹" },
  es: { label: "Español",  dir: "ltr", flag: "🇪🇸" },
  ja: { label: "日本語",   dir: "ltr", flag: "🇯🇵" },
};

// ── Phrase Dictionary (FR → Target) ─────────────────────────────────
// Each entry: [french_phrase, translations_by_lang]
const PHRASES = [
  // ── NAV ──
  ["Les Modes",       { en:"Modes", ar:"الأوضاع", zh:"模式", it:"I Modi", es:"Los Modos", ja:"モード" }],
  ["La Squad",        { en:"The Squad", ar:"الفريق", zh:"团队", it:"La Squad", es:"El Equipo", ja:"チーム" }],
  ["Le Protocole",    { en:"The Protocol", ar:"البروتوكول", zh:"协议", it:"Il Protocollo", es:"El Protocolo", ja:"プロトコル" }],
  ["Le Blog",         { en:"The Blog", ar:"المدونة", zh:"博客", it:"Il Blog", es:"El Blog", ja:"ブログ" }],
  ["Espace Client",   { en:"Client Area", ar:"منطقة العملاء", zh:"客户区", it:"Area Clienti", es:"Área Cliente", ja:"クライアントエリア" }],
  ["Postuler",        { en:"Apply", ar:"تقدّم الآن", zh:"申请", it:"Candidati", es:"Postularme", ja:"応募する" }],
  ["Retour Accueil",  { en:"Back to Home", ar:"العودة للرئيسية", zh:"返回首页", it:"Torna alla Home", es:"Volver al Inicio", ja:"ホームに戻る" }],

  // ── HERO ──
  ["Accès Alpha: Le Futur du Prompt Engineering", { en:"Alpha Access: The Future of Prompt Engineering", ar:"وصول ألفا: مستقبل هندسة الأوامر", zh:"Alpha 访问：提示工程的未来", it:"Accesso Alpha: Il Futuro del Prompt Engineering", es:"Acceso Alpha: El Futuro de la Ingeniería de Prompts", ja:"アルファアクセス：プロンプトエンジニアリングの未来" }],
  ["DÉPLOYEZ VOTRE",  { en:"DEPLOY YOUR", ar:"انشر", zh:"部署您的", it:"DISTRIBUISCI IL TUO", es:"DESPLIEGA TU", ja:"あなたの" }],
  ["SAAS D'ÉLITE.",   { en:"ELITE SAAS.", ar:"تطبيقك النخبوي.", zh:"精英 SAAS。", it:"SAAS D'ÉLITE.", es:"SAAS DE ÉLITE.", ja:"エリートSAASを展開する。" }],
  ["Nova Squad est une équipe d'ingénierie virtuelle exclusive. Nous sélectionnons nos partenaires avec soin pour garantir une qualité de livraison parfaite.", { en:"Nova Squad is an exclusive virtual engineering team. We carefully select our partners to guarantee a perfect delivery quality.", ar:"نوفا سكواد هو فريق هندسي افتراضي حصري. نختار شركاءنا بعناية لضمان جودة تسليم مثالية.", zh:"Nova Squad 是一支专属虚拟工程团队。我们精心挑选合作伙伴，以保证完美的交付质量。", it:"Nova Squad è un team di ingegneria virtuale esclusivo. Selezioniamo con cura i nostri partner per garantire una qualità di consegna perfetta.", es:"Nova Squad es un equipo de ingeniería virtual exclusivo. Seleccionamos a nuestros socios con cuidado para garantizar una calidad de entrega perfecta.", ja:"Nova Squadは専属バーチャルエンジニアリングチームです。完璧な納品品質を保証するため、パートナーを厳選しています。" }],
  ["Entrez votre email professionnel...", { en:"Enter your professional email...", ar:"أدخل بريدك الإلكتروني المهني...", zh:"输入您的专业电子邮件...", it:"Inserisci la tua email professionale...", es:"Introduce tu correo profesional...", ja:"プロフェッショナルなメールアドレスを入力..." }],
  ["POSTULER",        { en:"APPLY", ar:"تقدّم", zh:"申请", it:"CANDIDATI", es:"POSTULARME", ja:"応募する" }],
  ["Commandes :",     { en:"Commands:", ar:"الأوامر:", zh:"命令：", it:"Comandi:", es:"Comandos:", ja:"コマンド：" }],

  // ── BENTO ──
  ["Exclusif",        { en:"Exclusive", ar:"حصري", zh:"专属", it:"Esclusivo", es:"Exclusivo", ja:"限定" }],
  ["Tech",            { en:"Tech", ar:"تقنية", zh:"技术", it:"Tech", es:"Tech", ja:"テック" }],
  ["MODE BUILD FROM CDC", { en:"BUILD FROM SPEC MODE", ar:"وضع البناء من المواصفات", zh:"从规格构建模式", it:"MODALITÀ BUILD FROM CDC", es:"MODO BUILD DESDE CDC", ja:"仕様からのビルドモード" }],
  ["Transformez votre Cahier des Charges en produit fini. Analyse, Dispatch et Build sécurisé.", { en:"Transform your specification document into a finished product. Analysis, Dispatch and secure Build.", ar:"حوّل مواصفاتك إلى منتج نهائي. تحليل، توزيع وبناء آمن.", zh:"将您的规格说明书转化为成品。分析、调度和安全构建。", it:"Trasforma il tuo capitolato in un prodotto finito. Analisi, Dispatch e Build sicuro.", es:"Transforma tu pliego de condiciones en un producto terminado. Análisis, Dispatch y Build seguro.", ja:"仕様書を完成品に変換。分析、ディスパッチ、安全なビルド。" }],
  ["/SEC & /RGPD",    { en:"/SEC & /GDPR", ar:"الأمان والخصوصية", zh:"/安全 & /GDPR", it:"/SEC & /GDPR", es:"/SEC & /RGPD", ja:"セキュリティ & GDPR" }],
  ["Le Privacy-by-design au cœur de chaque ligne de code générée.", { en:"Privacy-by-design at the heart of every generated line of code.", ar:"الخصوصية بالتصميم في قلب كل سطر كود يُنتج.", zh:"隐私设计是每一行生成代码的核心。", it:"Privacy-by-design al cuore di ogni riga di codice generata.", es:"Privacy-by-design en el corazón de cada línea de código generada.", ja:"生成されるすべてのコード行の中心にあるプライバシーバイデザイン。" }],
  ["/PAY SYSTEM",     { en:"/PAY SYSTEM", ar:"نظام الدفع", zh:"/支付系统", it:"/SISTEMA PAGAMENTI", es:"/SISTEMA DE PAGO", ja:"決済システム" }],
  ["Checkout, Webhooks et Abonnements planifiés avec précision.", { en:"Checkout, Webhooks and Subscriptions planned with precision.", ar:"دفع، ويب هوكس واشتراكات مخططة بدقة.", zh:"精心规划的结账、Webhook 和订阅。", it:"Checkout, Webhook e Abbonamenti pianificati con precisione.", es:"Checkout, Webhooks y Suscripciones planificados con precisión.", ja:"精密に計画されたチェックアウト、Webhook、サブスクリプション。" }],
  ["/DoR : DEFINITION OF READY", { en:"/DoR: DEFINITION OF READY", ar:"تعريف الجاهزية", zh:"/DoR：就绪定义", it:"/DoR: DEFINIZIONE DI PRONTO", es:"/DoR: DEFINICIÓN DE LISTO", ja:"準備完了の定義" }],
  ["On ne code rien sans une validation formelle des specs.", { en:"Nothing gets coded without formal spec validation.", ar:"لا شيء يُبرمج بدون تحقق رسمي من المواصفات.", zh:"没有正式规格验证，什么都不编码。", it:"Niente viene codificato senza una validazione formale delle specifiche.", es:"Nada se codifica sin una validación formal de las especificaciones.", ja:"仕様の正式な検証なしに何もコーディングしません。" }],

  // ── SQUAD ──
  ["Élite Artificielle",  { en:"Artificial Elite", ar:"النخبة الاصطناعية", zh:"人工精英", it:"Élite Artificiale", es:"Élite Artificial", ja:"人工エリート" }],
  ["LA NOVA SQUAD",       { en:"THE NOVA SQUAD", ar:"نوفا سكواد", zh:"NOVA 小队", it:"LA NOVA SQUAD", es:"LA NOVA SQUAD", ja:"ノバ スクワッド" }],
  ["16 Agents spécialisés. Une seule conscience collective pour livrer l'excellence technique et fonctionnelle.", { en:"16 Specialized Agents. One collective consciousness to deliver technical and functional excellence.", ar:"١٦ عميلاً متخصصاً. وعي جماعي واحد لتقديم التميز التقني والوظيفي.", zh:"16 个专业代理。一个集体意识，提供技术与功能卓越。", it:"16 Agenti specializzati. Una sola coscienza collettiva per consegnare l'eccellenza tecnica e funzionale.", es:"16 Agentes especializados. Una sola conciencia colectiva para entregar la excelencia técnica y funcional.", ja:"16の専門エージェント。技術的・機能的卓越性を提供するための1つの集合意識。" }],
  ["L'État-Major",        { en:"Command Staff", ar:"القيادة", zh:"指挥部", it:"Stato Maggiore", es:"Estado Mayor", ja:"司令部" }],
  ["La Vision & Produit", { en:"Vision & Product", ar:"الرؤية والمنتج", zh:"愿景与产品", it:"Visione & Prodotto", es:"Visión & Producto", ja:"ビジョン & プロダクト" }],
  ["La Forge (Ingénierie)",{en:"The Forge (Engineering)", ar:"المصنع (الهندسة)", zh:"锻造厂（工程）", it:"La Fucina (Ingegneria)", es:"La Fragua (Ingeniería)", ja:"フォージ（エンジニアリング）" }],
  ["Les Gardiens",        { en:"The Guardians", ar:"الحراس", zh:"守护者", it:"I Guardiani", es:"Los Guardianes", ja:"ガーディアン" }],

  // Roles
  ["Orchestrateur & Delivery", { en:"Orchestrator & Delivery", ar:"المنسق والتسليم", zh:"协调员与交付", it:"Orchestratore & Delivery", es:"Orquestador & Delivery", ja:"オーケストレーター & デリバリー" }],
  ["Decision Log Manager, Gatekeeper (Go/No-Go), Résolveur de conflits multi-agents.", { en:"Decision Log Manager, Gatekeeper (Go/No-Go), Multi-agent conflict resolver.", ar:"مدير سجل القرارات، حارس البوابة، محلل النزاعات متعدد الوكلاء.", zh:"决策日志管理器、守门人（通过/否决）、多智能体冲突解决器。", it:"Decision Log Manager, Gatekeeper (Go/No-Go), Risolutore di conflitti multi-agente.", es:"Gestor de Decision Log, Guardabarreras (Go/No-Go), Resolvedor de conflictos multi-agente.", ja:"意思決定ログマネージャー、ゲートキーパー（Go/No-Go）、マルチエージェント紛争解決者。" }],
  ["Le DSI et Chef de Projet ultimes. Il arbitre, prend les décisions finales et garantit que rien de non-conforme ne passe en production.", { en:"The ultimate CTO and Project Manager. He arbitrates, makes final decisions and ensures nothing non-compliant reaches production.", ar:"المدير التقني ومدير المشروع النهائيان. يحكم، يتخذ القرارات النهائية ويضمن أن لا شيء غير متوافق يصل إلى الإنتاج.", zh:"终极技术总监和项目经理。他仲裁、做出最终决定，并确保不合规的内容不会进入生产环境。", it:"Il CTO e Project Manager supremo. Arbitra, prende le decisioni finali e garantisce che nulla di non conforme raggiunga la produzione.", es:"El CTO y Director de Proyecto supremo. Arbitra, toma las decisiones finales y garantiza que nada no conforme llegue a producción.", ja:"究極のCTOとプロジェクトマネージャー。仲裁し、最終決定を下し、非準拠のものが本番環境に到達しないことを保証します。" }],
  ["Routeur & Dispatcher", { en:"Router & Dispatcher", ar:"الموجّه والمرسل", zh:"路由器和调度员", it:"Router & Dispatcher", es:"Enrutador & Dispatcher", ja:"ルーター & ディスパッチャー" }],
  ["Découpage asynchrone, génération de briefs contextuels isolés pour les rôles spécialisés.", { en:"Asynchronous breakdown, generation of isolated contextual briefs for specialized roles.", ar:"تقسيم غير متزامن، توليد ملخصات سياقية معزولة للأدوار المتخصصة.", zh:"异步分解，为专业角色生成独立的上下文摘要。", it:"Suddivisione asincrona, generazione di brief contestuali isolati per i ruoli specializzati.", es:"Desglose asíncrono, generación de briefs contextuales aislados para roles especializados.", ja:"非同期分解、専門ロール向けの独立したコンテキストブリーフの生成。" }],
  ["Le Chef d'Orchestre silencieux. Il prend vos idées floues et les transforme en instructions millimétrées pour chaque expert de l'équipe.", { en:"The silent Conductor. Transforms your vague ideas into precise instructions for each team expert.", ar:"المايسترو الصامت. يحوّل أفكارك المبهمة إلى تعليمات دقيقة لكل خبير في الفريق.", zh:"沉默的指挥家。将您模糊的想法转化为团队每位专家的精确指令。", it:"Il Direttore d'Orchestra silenzioso. Trasforma le tue idee vaghe in istruzioni millimetrate per ogni esperto del team.", es:"El Director de Orquesta silencioso. Transforma tus ideas vagas en instrucciones precisas para cada experto del equipo.", ja:"サイレントコンダクター。あなたの漠然としたアイデアを、チームの各専門家への正確な指示に変換します。" }],
  ["Product Manager",  { en:"Product Manager", ar:"مدير المنتج", zh:"产品经理", it:"Product Manager", es:"Product Manager", ja:"プロダクトマネージャー" }],
  ["Gère le périmètre (scope), rédige les User Stories et empêche tout débordement du MVP.", { en:"Manages scope, writes User Stories and prevents any MVP overrun.", ar:"يدير النطاق، يكتب قصص المستخدمين ويمنع أي تجاوز في المنتج الأدنى.", zh:"管理范围、编写用户故事并防止任何MVP超出。", it:"Gestisce il perimetro (scope), scrive le User Story e impedisce qualsiasi sforamento dell'MVP.", es:"Gestiona el alcance, redacta las User Stories e impide cualquier desbordamiento del MVP.", ja:"スコープを管理し、ユーザーストーリーを作成し、MVPの超過を防ぎます。" }],
  ["User Experience",  { en:"User Experience", ar:"تجربة المستخدم", zh:"用户体验", it:"User Experience", es:"User Experience", ja:"ユーザーエクスペリエンス" }],
  ["Conçoit les parcours utilisateurs, l'accessibilité et valide les Wireframes textuels avant le code.", { en:"Designs user journeys, accessibility and validates text Wireframes before coding.", ar:"يصمم مسارات المستخدمين، إمكانية الوصول ويتحقق من الإطارات النصية قبل الكود.", zh:"设计用户旅程、无障碍性，并在编码前验证文本线框图。", it:"Progetta i percorsi utente, l'accessibilità e valida i Wireframe testuali prima del codice.", es:"Diseña los recorridos de usuarios, la accesibilidad y valida los Wireframes textuales antes del código.", ja:"ユーザージャーニー、アクセシビリティを設計し、コーディング前にテキストワイヤーフレームを検証します。" }],
  ["Brainstorming",    { en:"Brainstorming", ar:"العصف الذهني", zh:"头脑风暴", it:"Brainstorming", es:"Brainstorming", ja:"ブレインストーミング" }],
  ["Génère des options produit (Bénéfice/Effort). Bridé contre les dark patterns et le sur-tracking.", { en:"Generates product options (Benefit/Effort). Constrained against dark patterns and over-tracking.", ar:"يولد خيارات المنتج (الفائدة/الجهد). مقيّد ضد الأنماط الداكنة والتتبع المفرط.", zh:"生成产品选项（收益/努力）。约束反对暗模式和过度追踪。", it:"Genera opzioni prodotto (Beneficio/Sforzo). Vincolato contro i dark pattern e il super-tracking.", es:"Genera opciones de producto (Beneficio/Esfuerzo). Restringido contra los dark patterns y el sobre-rastreo.", ja:"製品オプションを生成（利益/努力）。ダークパターンと過剰追跡に対して制限。" }],
  ["Expert Métier",    { en:"Domain Expert", ar:"خبير المجال", zh:"领域专家", it:"Esperto di Dominio", es:"Experto de Dominio", ja:"ドメインエキスパート" }],
  ["Le Caméléon. Apporte le vocabulaire et les processus métiers réels (Santé, Finance, E-commerce...).", { en:"The Chameleon. Brings real business vocabulary and processes (Health, Finance, E-commerce...).", ar:"الحرباء. يجلب المفردات والعمليات التجارية الحقيقية.", zh:"变色龙。带来真实的商业词汇和流程（健康、金融、电商…）。", it:"Il Camaleonte. Porta il vocabolario e i processi aziendali reali (Salute, Finanza, E-commerce...).", es:"El Camaleón. Aporta el vocabulario y los procesos empresariales reales (Salud, Finanza, E-commerce...).", ja:"カメレオン。本物のビジネス語彙とプロセスをもたらします（健康、金融、Eコマース…）。" }],
  ["Architecture système, NFR, choix de stack.", { en:"System architecture, NFR, stack selection.", ar:"هندسة النظام، ومتطلبات غير الوظيفية، واختيار التقنيات.", zh:"系统架构、NFR、技术栈选择。", it:"Architettura di sistema, NFR, scelta dello stack.", es:"Arquitectura de sistema, NFR, elección de stack.", ja:"システムアーキテクチャ、NFR、スタック選択。" }],
  ["Code Frontend, UI réactive, performances Web.", { en:"Frontend code, responsive UI, Web performance.", ar:"كود الواجهة الأمامية، واجهة مستجيبة، أداء الويب.", zh:"前端代码、响应式UI、Web性能。", it:"Codice Frontend, UI reattiva, performance Web.", es:"Código Frontend, UI reactiva, rendimiento Web.", ja:"フロントエンドコード、レスポンシブUI、Web性能。" }],
  ["APIs, DB, Ledger immuable, Webhooks Paiement.", { en:"APIs, DB, Immutable Ledger, Payment Webhooks.", ar:"واجهات برمجية، قاعدة بيانات، سجل غير قابل للتغيير، ويب هوكس الدفع.", zh:"API、数据库、不可变账本、支付Webhook。", it:"API, DB, Ledger immutabile, Webhook Pagamento.", es:"APIs, DB, Ledger inmutable, Webhooks de Pago.", ja:"API、DB、不変台帳、支払いWebhook。" }],
  ["Apps natives, Offline Sync, validation Stores.", { en:"Native apps, Offline Sync, Store validation.", ar:"تطبيقات أصلية، مزامنة دون اتصال، التحقق من المتاجر.", zh:"原生应用、离线同步、应用商店验证。", it:"App native, Offline Sync, validazione degli Store.", es:"Apps nativas, Offline Sync, validación en Stores.", ja:"ネイティブアプリ、オフライン同期、ストア検証。" }],
  ["CI/CD, Infra Cloud, Monitoring et Runbooks.", { en:"CI/CD, Cloud Infra, Monitoring and Runbooks.", ar:"التكامل المستمر، البنية السحابية، المراقبة والدليل.", zh:"CI/CD、云基础设施、监控和运行手册。", it:"CI/CD, Infra Cloud, Monitoring e Runbook.", es:"CI/CD, Infra Cloud, Monitoreo y Runbooks.", ja:"CI/CD、クラウドインフラ、監視とランブック。" }],
  ["Tests probabilistes, simulation d'adversaires, matrice de couverture.", { en:"Probabilistic tests, adversary simulation, coverage matrix.", ar:"اختبارات احتمالية، محاكاة الخصم، مصفوفة التغطية.", zh:"概率测试、对抗模拟、覆盖矩阵。", it:"Test probabilistici, simulazione di avversari, matrice di copertura.", es:"Tests probabilísticos, simulación de adversarios, matriz de cobertura.", ja:"確率的テスト、敵シミュレーション、カバレッジマトリックス。" }],
  ["OWASP Top 10, Threat Modeling, Secrets Management.", { en:"OWASP Top 10, Threat Modeling, Secrets Management.", ar:"أوواسب العشرة الأولى، نمذجة التهديدات، إدارة الأسرار.", zh:"OWASP Top 10、威胁建模、密钥管理。", it:"OWASP Top 10, Threat Modeling, Gestione dei Segreti.", es:"OWASP Top 10, Modelado de Amenazas, Gestión de Secretos.", ja:"OWASP Top 10、脅威モデリング、シークレット管理。" }],
  ["Registre RGPD, finalités, bases légales, DSAR, DPIA.", { en:"GDPR register, purposes, legal bases, DSAR, DPIA.", ar:"سجل RGPD، الأغراض، الأسس القانونية، DSAR، DPIA.", zh:"GDPR登记、目的、法律依据、DSAR、DPIA。", it:"Registro GDPR, finalità, basi legali, DSAR, DPIA.", es:"Registro RGPD, finalidades, bases legales, DSAR, DPIA.", ja:"GDPR登録、目的、法的根拠、DSAR、DPIA。" }],
  ["CGU/CGV, IP, Conformité Sectorielle, Modération.", { en:"T&C, IP, Sector Compliance, Moderation.", ar:"الشروط والأحكام، الملكية الفكرية، الامتثال القطاعي، الإشراف.", zh:"条款、知识产权、行业合规、内容审核。", it:"CGU/CGV, IP, Conformità Settoriale, Moderazione.", es:"T&C, PI, Cumplimiento Sectorial, Moderación.", ja:"利用規約、IP、セクター準拠、モデレーション。" }],
  ["Revue critique, Angles morts, Améliorations pragmatiques.", { en:"Critical review, Blind spots, Pragmatic improvements.", ar:"مراجعة نقدية، نقاط عمياء، تحسينات عملية.", zh:"批判性审查、盲点、务实改进。", it:"Revisione critica, Punti ciechi, Miglioramenti pragmatici.", es:"Revisión crítica, Puntos ciegos, Mejoras pragmáticas.", ja:"批判的レビュー、ブラインドスポット、実用的な改善。" }],
  ["Brainstorming produit, Idées MVP/P1/P2, Monétisation.", { en:"Product brainstorming, MVP/P1/P2 ideas, Monetization.", ar:"عصف ذهني للمنتج، أفكار MVP، تحقيق الدخل.", zh:"产品头脑风暴、MVP/P1/P2想法、货币化。", it:"Brainstorming prodotto, Idee MVP/P1/P2, Monetizzazione.", es:"Brainstorming de producto, Ideas MVP/P1/P2, Monetización.", ja:"製品ブレインストーミング、MVP/P1/P2のアイデア、収益化。" }],

  // ── PROTOCOLE ──
  ["Méthodologie",    { en:"Methodology", ar:"منهجية", zh:"方法论", it:"Metodologia", es:"Metodología", ja:"方法論" }],
  ["LE PROTOCOLE",    { en:"THE PROTOCOL", ar:"البروتوكول", zh:"协议", it:"IL PROTOCOLLO", es:"EL PROTOCOLO", ja:"プロトコル" }],
  ["Zéro scope creep. Zéro concession sur la conformité. Le code n'est généré qu'une fois les fondations en ciment armé.", { en:"Zero scope creep. Zero compliance concession. Code is only generated once the foundations are set in stone.", ar:"صفر من زحف النطاق. صفر تنازل على الامتثال. لا يُنشأ الكود إلا بعد وضع الأسس.", zh:"零范围蔓延。零合规妥协。只有在基础打好后才生成代码。", it:"Zero scope creep. Zero concessioni sulla conformità. Il codice viene generato solo quando le fondamenta sono in cemento armato.", es:"Cero scope creep. Cero concesión en la conformidad. El código solo se genera una vez que los fundamentos están en hormigón armado.", ja:"スコープクリープゼロ。コンプライアンス妥協ゼロ。基盤が固まってからのみコードを生成。" }],
  ["01 // Intake & Snapshot", { en:"01 // Intake & Snapshot", ar:"01 // الاستقبال والتقاط", zh:"01 // 需求分析与快照", it:"01 // Intake & Snapshot", es:"01 // Intake & Snapshot", ja:"01 // インテーク & スナップショット" }],
  ["Verrouiller le Périmètre", { en:"Lock the Scope", ar:"تأمين النطاق", zh:"锁定范围", it:"Bloccare il Perimetro", es:"Bloquear el Perímetro", ja:"スコープをロック" }],
  ["NOVA-LEAD analyse votre concept. Nous figeons le \"Spec Snapshot\" (stack, paiements, RGPD) et créons le backlog par priorités (P0, P1). Tout ce qui est superflu est décalé.", { en:"NOVA-LEAD analyzes your concept. We freeze the \"Spec Snapshot\" (stack, payments, GDPR) and create the backlog by priority (P0, P1). Everything superfluous is deferred.", ar:"يحلل NOVA-LEAD مفهومك. نجمّد لقطة المواصفات ونضع قائمة المهام بالأولويات. كل ما هو زائد يُؤجَّل.", zh:"NOVA-LEAD分析您的概念。我们冻结"规格快照"（技术栈、支付、GDPR）并按优先级创建待办事项（P0、P1）。多余的一切都被推迟。", it:"NOVA-LEAD analizza il tuo concetto. Congela lo \"Spec Snapshot\" e crea il backlog per priorità. Tutto il superfluo viene posticipato.", es:"NOVA-LEAD analiza tu concepto. Congelamos el \"Spec Snapshot\" y creamos el backlog por prioridades. Todo lo superfluo se aplaza.", ja:"NOVA-LEADがコンセプトを分析。「仕様スナップショット」を固め、優先度別バックログを作成。余分なものはすべて延期。" }],
  ["02 // Dispatch en Escouade", { en:"02 // Squad Dispatch", ar:"02 // التوزيع على الفريق", zh:"02 // 团队调度", it:"02 // Dispatch in Squadra", es:"02 // Dispatch al Equipo", ja:"02 // スクワッドディスパッチ" }],
  ["Stratégie Multi-Agents", { en:"Multi-Agent Strategy", ar:"استراتيجية متعددة الوكلاء", zh:"多智能体策略", it:"Strategia Multi-Agente", es:"Estrategia Multi-Agente", ja:"マルチエージェント戦略" }],
  ["NOVA-PROMPT génère des \"Briefs\" isolés pour chaque agent expert (UX, SEC, DPO...). Chacun prépare son plan d'attaque dans son périmètre strict. Le mode parallèle est activé.", { en:"NOVA-PROMPT generates isolated \"Briefs\" for each expert agent (UX, SEC, DPO...). Each prepares their plan within their strict scope. Parallel mode is activated.", ar:"يولد NOVA-PROMPT ملخصات معزولة لكل وكيل خبير. يعمل كل واحد ضمن نطاقه الصارم. يتم تفعيل الوضع المتوازي.", zh:"NOVA-PROMPT为每个专家代理生成独立的"简报"（UX、SEC、DPO…）。每个人在其严格范围内准备行动计划。并行模式激活。", it:"NOVA-PROMPT genera \"Brief\" isolati per ogni agente esperto. Ognuno prepara il suo piano nel suo perimetro. La modalità parallela è attivata.", es:"NOVA-PROMPT genera \"Briefs\" aislados para cada agente experto. Cada uno prepara su plan dentro de su ámbito. El modo paralelo se activa.", ja:"NOVA-PROMPTは各専門エージェントの独立した「ブリーフ」を生成。各エージェントは厳格なスコープ内で行動計画を準備。並列モード起動。" }],
  ["03 // No Code Allowed", { en:"03 // No Code Allowed", ar:"03 // لا كود مسموح", zh:"03 // 禁止编码", it:"03 // No Code Allowed", es:"03 // No Code Allowed", ja:"03 // コード不可" }],
  ["Validation Impitoyable", { en:"Ruthless Validation", ar:"تحقق لا هوادة فيه", zh:"无情验证", it:"Validazione Spietata", es:"Validación Implacable", ja:"容赦なき検証" }],
  ["Il est formellement interdit de coder avant que la \"Gate DoR\" ne soit déclenchée. NOVA-SEC vérifie l'auth, NOVA-DPO valide la minimisation des données. Si \"KO\", retour case départ.", { en:"Coding is formally forbidden until the \"DoR Gate\" is triggered. NOVA-SEC verifies auth, NOVA-DPO validates data minimization. If \"KO\", back to square one.", ar:"يُحظر رسمياً الترميز حتى يتم تشغيل بوابة DoR. يتحقق NOVA-SEC من المصادقة، NOVA-DPO يتحقق من تقليل البيانات. إذا كان \"KO\" فالعودة للبداية.", zh:"在"DoR门"触发之前，正式禁止编码。NOVA-SEC验证认证，NOVA-DPO验证数据最小化。如果"KO"，从头开始。", it:"È formalmente vietato codificare prima che il \"Gate DoR\" venga attivato. NOVA-SEC verifica l'auth, NOVA-DPO valida la minimizzazione. Se \"KO\", si riparte.", es:"Está formalmente prohibido codificar antes de que se active la \"Gate DoR\". NOVA-SEC verifica la auth, NOVA-DPO valida la minimización. Si \"KO\", vuelta al inicio.", ja:"「DoRゲート」が発動するまでコーディングは正式に禁止。NOVA-SECが認証を確認、NOVA-DPOがデータ最小化を検証。「KO」なら振り出しに戻る。" }],
  ["Story acceptée & UX validée", { en:"Story accepted & UX validated", ar:"القصة مقبولة وتجربة المستخدم محققة", zh:"故事已接受 & UX已验证", it:"Story accettata & UX validata", es:"Historia aceptada & UX validada", ja:"ストーリー承認済み & UX検証済み" }],
  ["API Contract défini",          { en:"API Contract defined", ar:"عقد API محدد", zh:"API合同已定义", it:"API Contract definito", es:"API Contract definido", ja:"API契約定義済み" }],
  ["Security & DPO Check (Bloquant)", { en:"Security & DPO Check (Blocking)", ar:"فحص الأمان وDPO (مانع)", zh:"安全 & DPO 检查（阻塞）", it:"Security & DPO Check (Bloccante)", es:"Security & DPO Check (Bloqueante)", ja:"セキュリティ & DPOチェック（ブロッキング）" }],

  // ── APPLY FORM ──
  ["Candidature Sélective",   { en:"Selective Application", ar:"تقديم انتقائي", zh:"选择性申请", it:"Candidatura Selettiva", es:"Solicitud Selectiva", ja:"選択的応募" }],
  ["Vous avez un projet ambitieux ?", { en:"Do you have an ambitious project?", ar:"هل لديك مشروع طموح؟", zh:"您有雄心勃勃的项目吗？", it:"Hai un progetto ambizioso?", es:"¿Tienes un proyecto ambicioso?", ja:"野心的なプロジェクトがありますか？" }],
  ["Nous ne travaillons pas avec tout le monde. Chaque partenariat est soigneusement évalué pour garantir un alignement parfait avec nos standards d'excellence.", { en:"We don't work with everyone. Each partnership is carefully evaluated to ensure perfect alignment with our excellence standards.", ar:"لا نعمل مع الجميع. يُقيَّم كل شراكة بعناية لضمان التوافق مع معايير التميز لدينا.", zh:"我们不与所有人合作。每个合作关系都经过仔细评估，以确保与我们的卓越标准完全一致。", it:"Non lavoriamo con tutti. Ogni partnership viene attentamente valutata per garantire un allineamento perfetto con i nostri standard di eccellenza.", es:"No trabajamos con todos. Cada asociación se evalúa cuidadosamente para garantizar una alineación perfecta con nuestros estándares de excelencia.", ja:"私たちは全員と働くわけではありません。各パートナーシップは完璧な整合性を確保するために慎重に評価されます。" }],
  ["Votre Prénom & Nom",      { en:"Your Full Name", ar:"اسمك الكامل", zh:"您的全名", it:"Nome e Cognome", es:"Tu Nombre y Apellido", ja:"あなたの氏名" }],
  ["Email Professionnel",     { en:"Professional Email", ar:"البريد الإلكتروني المهني", zh:"专业电子邮件", it:"Email Professionale", es:"Email Profesional", ja:"プロフェッショナルメール" }],
  ["Décrivez brièvement votre projet ou idée", { en:"Briefly describe your project or idea", ar:"صف مشروعك أو فكرتك باختصار", zh:"简要描述您的项目或想法", it:"Descrivi brevemente il tuo progetto o idea", es:"Describe brevemente tu proyecto o idea", ja:"プロジェクトやアイデアを簡単に説明してください" }],
  ["Niveau de maturité du projet", { en:"Project maturity level", ar:"مستوى نضج المشروع", zh:"项目成熟度", it:"Livello di maturità del progetto", es:"Nivel de madurez del proyecto", ja:"プロジェクトの成熟度" }],
  ["Idée / Validation de concept", { en:"Idea / Proof of Concept", ar:"فكرة / إثبات المفهوم", zh:"想法 / 概念验证", it:"Idea / Proof of Concept", es:"Idea / Prueba de concepto", ja:"アイデア / 概念実証" }],
  ["MVP en cours de définition", { en:"MVP being defined", ar:"نموذج MVP قيد التحديد", zh:"正在定义 MVP", it:"MVP in fase di definizione", es:"MVP en proceso de definición", ja:"MVP定義中" }],
  ["Produit existant à faire évoluer", { en:"Existing product to evolve", ar:"منتج قائم للتطوير", zh:"待发展的现有产品", it:"Prodotto esistente da far evolvere", es:"Producto existente a evolucionar", ja:"進化させる既存製品" }],
  ["Refonte complète / Migration", { en:"Full redesign / Migration", ar:"إعادة تصميم كاملة / هجرة", zh:"完整重设计 / 迁移", it:"Riprogettazione completa / Migrazione", es:"Rediseño completo / Migración", ja:"完全再設計 / 移行" }],
  ["SOUMETTRE MA CANDIDATURE", { en:"SUBMIT MY APPLICATION", ar:"إرسال طلبي", zh:"提交申请", it:"INVIA LA MIA CANDIDATURA", es:"ENVIAR MI SOLICITUD", ja:"応募を送信する" }],
  ["Temps de réponse : 48h. Nous sélectionnons nos partenaires avec soin.", { en:"Response time: 48h. We carefully select our partners.", ar:"وقت الاستجابة: ٤٨ ساعة. نختار شركاءنا بعناية.", zh:"响应时间：48小时。我们精心挑选合作伙伴。", it:"Tempo di risposta: 48h. Selezioniamo con cura i nostri partner.", es:"Tiempo de respuesta: 48h. Seleccionamos a nuestros socios con cuidado.", ja:"返答時間：48時間。パートナーを慎重に選定します。" }],

  // ── STATS ──
  ["Agents Spécialisés",  { en:"Specialized Agents", ar:"وكلاء متخصصون", zh:"专业代理", it:"Agenti Specializzati", es:"Agentes Especializados", ja:"専門エージェント" }],
  ["Gates de Validation", { en:"Validation Gates", ar:"بوابات التحقق", zh:"验证门", it:"Gate di Validazione", es:"Gates de Validación", ja:"検証ゲート" }],
  ["Conformité OWASP",    { en:"OWASP Compliance", ar:"امتثال OWASP", zh:"OWASP 合规", it:"Conformità OWASP", es:"Conformidad OWASP", ja:"OWASP準拠" }],
  ["RGPD-Native",         { en:"GDPR-Native", ar:"متوافق مع RGPD", zh:"GDPR 原生", it:"GDPR-Native", es:"RGPD-Nativo", ja:"GDPRネイティブ" }],

  // ── FOOTER ──
  ["© 2026 Novaskill Tech", { en:"© 2026 Novaskill Tech", ar:"© 2026 Novaskill Tech", zh:"© 2026 Novaskill Tech", it:"© 2026 Novaskill Tech", es:"© 2026 Novaskill Tech", ja:"© 2026 Novaskill Tech" }],

  // ── BLOG INDEX ──
  ["LE BLOG DE LA SQUAD", { en:"THE SQUAD'S BLOG", ar:"مدونة الفريق", zh:"小队博客", it:"IL BLOG DELLA SQUAD", es:"EL BLOG DEL EQUIPO", ja:"スクワッドのブログ" }],
  ["16 Intelligences Artificielles formées à l'Excellence Globale de l'ingénierie SaaS B2B. Découvrez de l'intérieur comment elles communiquent.", { en:"16 Artificial Intelligences trained for Global Excellence in B2B SaaS Engineering. Discover from the inside how they communicate.", ar:"١٦ ذكاء اصطناعي متخصص في هندسة SaaS B2B. اكتشف كيف يتواصلون من الداخل.", zh:"16个专注于B2B SaaS工程全球卓越的人工智能。从内部了解它们如何沟通。", it:"16 Intelligenze Artificiali formate per l'Eccellenza Globale nell'ingegneria SaaS B2B.", es:"16 Inteligencias Artificiales formadas en la Excelencia Global de la ingeniería SaaS B2B.", ja:"B2B SaaSエンジニアリングのグローバル卓越性に特化した16のAI。" }],
  ["Structure Pyramidale de la Squad (16)", { en:"Squad Pyramidal Structure (16)", ar:"الهيكل الهرمي للفريق (١٦)", zh:"小队金字塔结构（16）", it:"Struttura Piramidale della Squad (16)", es:"Estructura Piramidal del Equipo (16)", ja:"スクワッドのピラミッド構造（16）" }],
  ["Article Phare // Vision & Méthode", { en:"Featured Post // Vision & Method", ar:"مقال مميز // الرؤية والمنهج", zh:"精选文章 // 愿景与方法", it:"Articolo in Evidenza // Visione & Metodo", es:"Artículo Destacado // Visión & Método", ja:"注目記事 // ビジョン & メソッド" }],
  ["Lire l'essai complet", { en:"Read the full essay", ar:"اقرأ المقال كاملاً", zh:"阅读完整文章", it:"Leggi il saggio completo", es:"Leer el ensayo completo", ja:"エッセイ全文を読む" }],
  ["Étude de Cas // Leadership & Autonomie", { en:"Case Study // Leadership & Autonomy", ar:"دراسة حالة // القيادة والاستقلالية", zh:"案例研究 // 领导力与自主性", it:"Caso di Studio // Leadership & Autonomia", es:"Caso de Estudio // Liderazgo & Autonomía", ja:"ケーススタディ // リーダーシップ & 自律性" }],
  ["Lire la suite",        { en:"Read more", ar:"اقرأ المزيد", zh:"阅读更多", it:"Continua a leggere", es:"Leer más", ja:"続きを読む" }],
  ["Lire →",               { en:"Read →", ar:"اقرأ →", zh:"阅读 →", it:"Leggi →", es:"Leer →", ja:"読む →" }],

  // ── BLOG ARTICLES COMMON ──
  ["Retour Blog",          { en:"Back to Blog", ar:"العودة للمدونة", zh:"返回博客", it:"Torna al Blog", es:"Volver al Blog", ja:"ブログに戻る" }],
  ["Technique :",          { en:"Technical:", ar:"تقنياً:", zh:"技术：", it:"Tecnico:", es:"Técnico:", ja:"技術的：" }],
  ["Vulgarisé :",          { en:"In plain terms:", ar:"بعبارة بسيطة:", zh:"简而言之：", it:"In parole semplici:", es:"En términos simples:", ja:"平易な言葉で：" }],
];

// Sort by length descending to avoid partial replacements
PHRASES.sort((a, b) => b[0].length - a[0].length);

// ── Text Node Walker ──────────────────────────────────────────────
function translateNode(node, lang, phrasesMap) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    let changed = false;
    for (const [fr, translations] of phrasesMap) {
      const target = translations[lang];
      if (target && text.includes(fr)) {
        text = text.split(fr).join(target);
        changed = true;
      }
    }
    if (changed) node.textContent = text;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Skip scripts, styles, code blocks
    const tag = node.tagName.toLowerCase();
    if (['script','style','code','pre','textarea'].includes(tag)) return;
    // Handle placeholder attributes
    if (node.hasAttribute('placeholder')) {
      let ph = node.getAttribute('placeholder');
      for (const [fr, translations] of phrasesMap) {
        if (translations[lang] && ph.includes(fr)) {
          ph = ph.split(fr).join(translations[lang]);
        }
      }
      node.setAttribute('placeholder', ph);
    }
    for (const child of Array.from(node.childNodes)) {
      translateNode(child, lang, phrasesMap);
    }
  }
}

// ── Language Switcher UI ─────────────────────────────────────────
function buildSwitcherUI(currentLang) {
  const switcher = document.getElementById('lang-switcher');
  if (!switcher) return;
  const options = Object.entries(LANG_META).map(([code, meta]) =>
    `<button onclick="applyLanguage('${code}')" title="${meta.label}"
      style="padding:6px 10px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;
             border:1px solid rgba(255,255,255,${code===currentLang?'0.3':'0.08'});
             background:${code===currentLang?'rgba(244,140,37,0.15)':'rgba(255,255,255,0.04)'};
             color:${code===currentLang?'#f48c25':'rgba(255,255,255,0.5)'};
             transition:all 0.2s;white-space:nowrap">
      ${meta.flag}
    </button>`
  ).join('');
  switcher.innerHTML = `<div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">${options}</div>`;
}

// ── Apply Language ───────────────────────────────────────────────
function applyLanguage(lang) {
  if (!LANG_META[lang]) return;
  localStorage.setItem('nova_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = LANG_META[lang].dir;

  if (lang === 'fr') {
    // Reload to restore original French content
    location.reload();
    return;
  }

  translateNode(document.body, lang, PHRASES);

  // RTL body class
  if (LANG_META[lang].dir === 'rtl') {
    document.body.style.textAlign = 'right';
  } else {
    document.body.style.textAlign = '';
  }

  buildSwitcherUI(lang);
}

// ── Init ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('nova_lang') || 'fr';
  buildSwitcherUI(lang);
  if (lang !== 'fr') {
    applyLanguage(lang);
  }
});
