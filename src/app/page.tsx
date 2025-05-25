"use client";

import Image from "next/image";
import Link from "next/link";
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
    let valorAvisoPrevio = avisoPrevio ? salarioNum : 0;

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      <div className="row-start-1 sm:row-start-2 col-span-full">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Calculadora de Rescisão Trabalhista
        </h1>
        <form
          className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
        <div className="w-full max-w-md bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
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
      </div>
      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>Os cálculos apresentados são estimativas e podem não refletir valores exatos.</p>
        <p>Recomenda-se consultar um advogado trabalhista para informações detalhadas.</p>
        <p>As leis trabalhistas podem mudar, verifique sempre as atualizações legais.</p>
      </footer>
    </div>
  );
}
