"use client";

import { useState } from "react";

export default function Home() {
  const [salario, setSalario] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [dataDispensa, setDataDispensa] = useState("");
  const [formaDemissao, setFormaDemissao] = useState("semJustaCausa");
  const [avisoPrevio, setAvisoPrevio] = useState(false);
  const [feriasVencidas, setFeriasVencidas] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [explicacoes, setExplicacoes] = useState(null);

  const calcularRescisao = () => {
    const salarioNum = parseFloat(salario);
    const dataInicio = new Date(dataContratacao);
    const dataFim = new Date(dataDispensa);

    if (
      isNaN(salarioNum) ||
      salarioNum <= 0 ||
      isNaN(dataInicio.getTime()) ||
      isNaN(dataFim.getTime()) ||
      dataInicio >= dataFim
    ) {
      setResultado("Por favor, insira valores válidos para todos os campos.");
      setExplicacoes(null);
      return;
    }

    const tempoTrabalhoMeses =
      (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 +
      (dataFim.getMonth() - dataInicio.getMonth());

    let valorRescisao = 0;
    let multaFgts = 0;
    let valorFerias = 0;
    const valorAvisoPrevio = avisoPrevio ? salarioNum : 0;

    if (formaDemissao === "semJustaCausa") {
      valorRescisao = salarioNum * tempoTrabalhoMeses * 0.5;
      multaFgts = salarioNum * 0.4;
    } else if (formaDemissao === "comJustaCausa") {
      valorRescisao = salarioNum * tempoTrabalhoMeses * 0.2;
    } else if (formaDemissao === "pedidoDemissao") {
      valorRescisao = salarioNum * tempoTrabalhoMeses * 0.3;
    }

    if (feriasVencidas) {
      valorFerias = salarioNum / 3;
    }

    const total = valorRescisao + multaFgts + valorFerias + valorAvisoPrevio;

    setResultado(`O valor total estimado da rescisão é R$ ${total.toFixed(2)}.`);
    setExplicacoes(
      `Detalhes: \n- Rescisão: R$ ${valorRescisao.toFixed(2)} \n- Multa do FGTS: R$ ${multaFgts.toFixed(2)} \n- Férias Vencidas: R$ ${valorFerias.toFixed(2)} \n- Aviso Prévio: R$ ${valorAvisoPrevio.toFixed(2)} \n- Este cálculo é uma estimativa e pode variar dependendo das condições específicas do contrato de trabalho.`
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Calculadora de Rescisão Trabalhista
      </h1>
      <p className="text-lg mb-8">
        Use esta calculadora para estimar os valores de sua rescisão trabalhista
        com base nas leis brasileiras.
      </p>
      <form
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          calcularRescisao();
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="salario"
          >
            Salário Bruto (R$)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="salario"
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Digite seu salário bruto"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dataContratacao"
          >
            Data de Contratação
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dataContratacao"
            type="date"
            value={dataContratacao}
            onChange={(e) => setDataContratacao(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dataDispensa"
          >
            Data de Dispensa
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dataDispensa"
            type="date"
            value={dataDispensa}
            onChange={(e) => setDataDispensa(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formaDemissao"
          >
            Forma de Demissão
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formaDemissao"
            value={formaDemissao}
            onChange={(e) => setFormaDemissao(e.target.value)}
          >
            <option value="semJustaCausa">Sem Justa Causa</option>
            <option value="comJustaCausa">Com Justa Causa</option>
            <option value="pedidoDemissao">Pedido de Demissão</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Aviso Prévio
          </label>
          <input
            type="checkbox"
            checked={avisoPrevio}
            onChange={(e) => setAvisoPrevio(e.target.checked)}
          />
          <span className="ml-2 text-gray-700">Sim</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tem Férias Vencidas?
          </label>
          <input
            type="checkbox"
            checked={feriasVencidas}
            onChange={(e) => setFeriasVencidas(e.target.checked)}
          />
          <span className="ml-2 text-gray-700">Sim</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Calcular
        </button>
      </form>
      <div className="w-full max-w-md bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Resultados</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {resultado || "Os resultados aparecerão aqui."}
        </p>
        {explicacoes && (
          <p className="text-gray-600 mt-4 whitespace-pre-line">
            {explicacoes}
          </p>
        )}
      </div>
      <footer className="text-sm text-gray-500">
        <p>
          Os cálculos apresentados são estimativas e podem não refletir valores
          exatos.
        </p>
        <p>
          Recomenda-se consultar um advogado trabalhista para informações
          detalhadas.
        </p>
        <p>
          As leis trabalhistas podem mudar, verifique sempre as atualizações
          legais.
        </p>
      </footer>
    </main>
  );
}
