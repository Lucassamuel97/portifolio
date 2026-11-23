import type { CaseSchematic as CaseSchematicId } from '@/types';

// Esquemas técnicos dos estudos de caso. Cores vêm de classes em globals.css (.esquema ...),
// então funcionam nos dois temas. Em vermelho de revisão: o que foi construído ou o ponto-chave.

const Svg = ({ label, altura = 196, children }: { label: string; altura?: number; children: React.ReactNode }) => (
  <svg viewBox={`0 0 320 ${altura}`} role="img" aria-label={label} className="esquema h-auto w-full font-display text-tinta">
    {children}
  </svg>
);

function Imasp() {
  return (
    <Svg label="Esquema: requisição, aprovação, co-participação calculada e parcelas na folha, com trilha de auditoria em todas as etapas" altura={204}>
      <rect className="fio fio--tracejado" x="4" y="6" width="312" height="164" />
      <rect className="caixa" x="16" y="20" width="124" height="50" />
      <text className="texto texto--fino" x="24" y="36">1</text>
      <text className="texto" x="78" y="59" textAnchor="middle">Requisição</text>
      <rect className="caixa" x="180" y="20" width="124" height="50" />
      <text className="texto texto--fino" x="188" y="36">2</text>
      <text className="texto" x="242" y="59" textAnchor="middle">Aprovação</text>
      <rect className="caixa caixa--revisao" x="180" y="106" width="124" height="50" />
      <text className="texto texto--fino" x="188" y="122">3</text>
      <text className="texto" x="242" y="145" textAnchor="middle">Co-participação</text>
      <rect className="caixa" x="16" y="106" width="124" height="50" />
      <text className="texto texto--fino" x="24" y="122">4</text>
      <text className="texto" x="78" y="145" textAnchor="middle">Parcelas na folha</text>
      <path className="fio" d="M140 45 H174 M242 70 V100 M180 131 H146" />
      <path className="ponta" d="M180 45 l-7 -4 v8 z M242 106 l-4 -7 h8 z M140 131 l7 -4 v8 z" />
      <text className="texto texto--fino" x="10" y="192">tracejado: trilha de auditoria em todas as etapas</text>
    </Svg>
  );
}

function Social() {
  return (
    <Svg label="Esquema: o legado passa por importadores até a nova base; o CadÚnico entra por uma fila">
      <rect className="caixa" x="6" y="18" width="104" height="62" />
      <text className="texto" x="58" y="40" textAnchor="middle">Legado</text>
      <text className="texto texto--fino" x="58" y="56" textAnchor="middle">PHP 5.6</text>
      <text className="texto texto--fino" x="58" y="70" textAnchor="middle">101 tabelas, 0 FKs</text>
      <rect className="caixa caixa--revisao" x="122" y="32" width="88" height="34" />
      <text className="texto texto--fino" x="166" y="53" textAnchor="middle">importadores</text>
      <rect className="caixa caixa--forte" x="222" y="18" width="92" height="62" />
      <text className="texto" x="268" y="40" textAnchor="middle">Nova base</text>
      <text className="texto texto--fino" x="268" y="56" textAnchor="middle">Laravel 13</text>
      <text className="texto texto--fino" x="268" y="70" textAnchor="middle">FKs e auditoria</text>
      <path className="fio" d="M110 49 H116 M210 49 H216" />
      <path className="ponta" d="M122 49 l-6 -4 v8 z M222 49 l-6 -4 v8 z" />
      <rect className="caixa" x="6" y="122" width="104" height="34" />
      <text className="texto" x="58" y="143" textAnchor="middle">CadÚnico</text>
      <rect className="caixa caixa--revisao" x="122" y="122" width="88" height="34" />
      <text className="texto texto--fino" x="166" y="143" textAnchor="middle">fila (22h)</text>
      <path className="fio" d="M110 139 H116 M210 139 H268 V86" />
      <path className="ponta" d="M122 139 l-6 -4 v8 z M268 80 l-4 7 h8 z" />
      <text className="texto texto--fino" x="6" y="184">em vermelho: o caminho da migração</text>
    </Svg>
  );
}

function Sicoli() {
  return (
    <Svg label="Esquema: processos importados do PNCP viram licitações; o parecer é conferido pela IA com os dados oficiais">
      <rect className="caixa" x="8" y="20" width="72" height="36" />
      <text className="texto" x="44" y="42" textAnchor="middle">PNCP</text>
      <rect className="caixa caixa--forte" x="110" y="20" width="92" height="36" />
      <text className="texto" x="156" y="42" textAnchor="middle">Licitação</text>
      <rect className="caixa" x="232" y="20" width="80" height="36" />
      <text className="texto" x="272" y="42" textAnchor="middle">Parecer</text>
      <path className="fio" d="M80 38 H104 M202 38 H226" />
      <path className="ponta" d="M110 38 l-6 -4 v8 z M232 38 l-6 -4 v8 z" />
      <text className="texto texto--fino" x="95" y="74" textAnchor="middle">importa</text>
      <rect className="caixa caixa--revisao" x="196" y="122" width="116" height="44" />
      <text className="texto" x="254" y="141" textAnchor="middle">IA confere</text>
      <text className="texto texto--fino" x="254" y="157" textAnchor="middle">OpenAI ou Gemini</text>
      <path className="fio fio--tracejado" d="M156 56 V144 H190" />
      <path className="ponta" d="M196 144 l-6 -4 v8 z" />
      <text className="texto texto--fino" x="148" y="138" textAnchor="end">dados oficiais</text>
      <path className="fio" d="M272 56 V116" />
      <path className="ponta" d="M272 56 l-4 7 h8 z M272 122 l-4 -7 h8 z" />
      <text className="texto texto--fino" x="278" y="94">ajusta</text>
    </Svg>
  );
}

function Suporte() {
  return (
    <Svg label="Esquema: o chamado vai ao assistente, que consulta os manuais; se o manual cobre, responde; se não, passa para a equipe, avisada por e-mail">
      <rect className="caixa caixa--revisao" x="94" y="8" width="86" height="34" />
      <text className="texto" x="137" y="29" textAnchor="middle">Manuais</text>
      <path className="fio fio--tracejado" d="M137 42 V72" />
      <path className="ponta" d="M137 78 l-4 -7 h8 z" />
      <rect className="caixa" x="6" y="78" width="70" height="40" />
      <text className="texto" x="41" y="96" textAnchor="middle">Chamado</text>
      <text className="texto texto--fino" x="41" y="110" textAnchor="middle">no sistema</text>
      <path className="fio" d="M76 98 H88" />
      <path className="ponta" d="M94 98 l-6 -4 v8 z" />
      <rect className="caixa caixa--forte" x="94" y="78" width="86" height="40" />
      <text className="texto" x="137" y="96" textAnchor="middle">Assistente</text>
      <text className="texto texto--fino" x="137" y="110" textAnchor="middle">Claude</text>
      <path className="fio" d="M180 98 H186" />
      <path className="ponta" d="M192 98 l-6 -4 v8 z" />
      <path className="caixa" d="M220 70 L248 98 L220 126 L192 98 Z" />
      <text className="texto texto--fino" x="220" y="102" textAnchor="middle">cobre?</text>
      <path className="fio" d="M220 70 V51 H246 M220 126 V145 H246" />
      <path className="ponta" d="M252 51 l-6 -4 v8 z M252 145 l-6 -4 v8 z" />
      <text className="texto texto--fino" x="226" y="63">sim</text>
      <text className="texto texto--fino" x="226" y="139">não</text>
      <rect className="caixa" x="252" y="34" width="64" height="34" />
      <text className="texto" x="284" y="55" textAnchor="middle" style={{ fontSize: 11.5 }}>Responde</text>
      <rect className="caixa" x="252" y="128" width="64" height="34" />
      <text className="texto" x="284" y="149" textAnchor="middle" style={{ fontSize: 11.5 }}>Equipe</text>
      <text className="texto texto--fino" x="316" y="182" textAnchor="end">aviso por e-mail</text>
    </Svg>
  );
}

function Auditoria() {
  return (
    <Svg label="Esquema: as três etapas da auditoria, planejamento, execução e controle" altura={140}>
      <rect className="caixa" x="6" y="44" width="92" height="44" />
      <text className="texto texto--fino" x="14" y="59">1</text>
      <text className="texto" x="52" y="79" textAnchor="middle">Planejar</text>
      <rect className="caixa" x="114" y="44" width="92" height="44" />
      <text className="texto texto--fino" x="122" y="59">2</text>
      <text className="texto" x="160" y="79" textAnchor="middle">Executar</text>
      <rect className="caixa caixa--revisao" x="222" y="44" width="92" height="44" />
      <text className="texto texto--fino" x="230" y="59">3</text>
      <text className="texto" x="268" y="79" textAnchor="middle">Controlar</text>
      <path className="fio" d="M98 66 H112 M206 66 H220" />
      <path className="marca-revisao" d="M114 66 l-6 -4 v8 z M222 66 l-6 -4 v8 z" />
    </Svg>
  );
}

function Contratos() {
  return (
    <Svg label="Esquema: o SIM-AM sincroniza os contratos; antes do prazo, um alerta é enviado por e-mail">
      <rect className="caixa" x="10" y="16" width="76" height="34" />
      <text className="texto" x="48" y="37" textAnchor="middle">SIM-AM</text>
      <path className="fio" d="M86 27 H124 M86 39 H124" />
      <path className="marca-revisao" d="M124 27 l-6 -4 v8 z M86 39 l6 -4 v8 z" />
      <rect className="caixa caixa--forte" x="124" y="12" width="104" height="42" />
      <text className="texto" x="176" y="37" textAnchor="middle">Contratos</text>
      <path className="fio" d="M20 150 H300" />
      <path className="fio" d="M20 145 v10 M76 145 v10 M132 145 v10 M188 145 v10 M244 145 v10 M300 145 v10" />
      <rect className="caixa" x="40" y="120" width="230" height="14" />
      <path className="fio fio--tracejado" d="M176 54 V100 H226 V120" />
      <rect className="caixa caixa--revisao" x="190" y="78" width="72" height="22" />
      <text className="texto texto--fino" x="226" y="93" textAnchor="middle">e-mail</text>
      <path className="marca-revisao" d="M270 112 l-6 -8 h12 z" />
      <text className="texto texto--fino" x="270" y="178" textAnchor="middle">prazo</text>
      <path className="fio" d="M270 134 V166" />
      <text className="texto texto--fino" x="20" y="178">vigência do contrato</text>
    </Svg>
  );
}

const ESQUEMAS: Record<CaseSchematicId, () => React.JSX.Element> = {
  imasp: Imasp,
  social: Social,
  sicoli: Sicoli,
  suporte: Suporte,
  auditoria: Auditoria,
  contratos: Contratos,
};

export function CaseSchematic({ id }: { id: CaseSchematicId }) {
  const Esquema = ESQUEMAS[id];
  return <Esquema />;
}
