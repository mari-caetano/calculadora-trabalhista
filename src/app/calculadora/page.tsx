export default function Calculadora() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Calculadora de Rescisão Trabalhista</h1>
      <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salario">
            Salário Bruto (R$)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="salario"
            type="number"
            placeholder="Digite seu salário bruto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempo">
            Tempo de Trabalho (meses)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tempo"
            type="number"
            placeholder="Digite o tempo de trabalho em meses"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
            Tipo de Rescisão
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tipo"
          >
            <option value="semJustaCausa">Sem Justa Causa</option>
            <option value="comJustaCausa">Com Justa Causa</option>
            <option value="pedidoDemissao">Pedido de Demissão</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Calcular
        </button>
      </form>
      <div className="w-full max-w-md bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Resultados</h2>
        <p className="text-gray-700">Os resultados aparecerão aqui.</p>
      </div>
    </main>
  );
}