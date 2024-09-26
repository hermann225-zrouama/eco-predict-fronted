import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function PredictSection__structures5() {
  const [clientId, setClientId] = useState('');
  const [montantDemande, setMontantDemande] = useState('');
  const [tauxInteret, setTauxInteret] = useState('0.05');
  const [periodeRemboursement, setPeriodeRemboursement] = useState('60');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [historique, setHistorique] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(process.env)
  console.log(apiUrl)


  const fetchHistorique = async () => {
    try {
      
      const response = await fetch(`http://147.79.114.72:32040/historique`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'historique');
      }
      const data = await response.json();
      setHistorique(data.historique);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchHistorique();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`http://147.79.114.72:32040/verifier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          montant_demande: parseFloat(montantDemande),
          taux_interet: parseFloat(tauxInteret),
          periode_remboursement: parseInt(periodeRemboursement, 10),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la vérification');
      }

      const data = await response.json();
      setResult(data.result[0]);

      fetchHistorique();
    } catch (err) {
      setError(err.message);
    }
  };

  const getSolvabilityColor = (probabilite) => {
    if (probabilite > 80) return '#4caf50'; // Green
    if (probabilite > 60) return '#ffeb3b'; // Yellow
    if (probabilite > 40) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="sticky top-0 z-10 w-full md:w-1/3 px-4 mb-4 md:mb-0">
            <section className="py-24 md:py-32 bg-white" style={{ backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")', backgroundPosition: 'center' }}>
              <div className="container px-4 mx-auto">
                <div className="">
                  <div className="max-w-sm mx-auto">
                    <div className="mb-6 text-center">
                      <h3 className="mb-4 text-2xl md:text-3xl font-bold">Eco Predict</h3>
                      <p className="text-lg text-coolGray-500 font-medium">Renseigner le formulaire</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label className="block mb-2 text-coolGray-800 font-medium">Numéro de compte</label>
                        <input
                          className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          type="text"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                          placeholder="Acc no: xxxxxxx"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 text-coolGray-800 font-medium">Montant demandé</label>
                        <input
                          className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          type="number"
                          value={montantDemande}
                          onChange={(e) => setMontantDemande(e.target.value)}
                          placeholder="Montant"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 text-coolGray-800 font-medium">Taux d'intérêt</label>
                        <input
                          className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          type="number"
                          value={tauxInteret}
                          onChange={(e) => setTauxInteret(e.target.value)}
                          placeholder="Taux d'intérêt (%)"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 text-coolGray-800 font-medium">Période de remboursement</label>
                        <input
                          className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          type="number"
                          value={periodeRemboursement}
                          onChange={(e) => setPeriodeRemboursement(e.target.value)}
                          placeholder="Période de remboursement (mois)"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-block py-3 px-7 mb-6 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm"
                      >
                        Vérifier la solvabilité
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
            {result && (
              <section className="wave-top wave-bottom bg-white py-24">
                <div className="wave wave-top w-full text-coolGray-50">
                  <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1440 64.5909H1090.08C833.336 64.5909 580.229 -7.62939e-06 360 -7.62939e-06C139.771 -7.62939e-06 0 64.5909 0 64.5909V116H1440V64.5909Z" fill="currentColor"></path>
                  </svg>
                </div>
                <div className="py-24 bg-coolGray-50" style={{ backgroundImage: 'url("flex-ui-assets/elements/pattern-light1.svg")', backgroundPosition: 'center' }}>
                  <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                      <div className="mx-auto h-full border border-coolGray-100 bg-white rounded-md shadow-dashboard">
                        <div className="p-6 border-b border-coolGray-100">
                          <div className="flex flex-wrap items-center justify-between -m-2 mb-4">
                            <div className="w-auto p-2">
                              <h2 className="text-coolGray-900 text-lg font-semibold">Résultats du calcul</h2>
                            </div>
                            <div className="w-auto p-2">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6.66667C7.73629 6.66667 7.47851 6.74487 7.25924 6.89138C7.03998 7.03788 6.86908 7.24612 6.76816 7.48976C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25627 7.73988 9.30772C7.99852 9.35916 8.26661 9.33276 8.51025 9.23184C8.75388 9.13092 8.96212 8.96003 9.10863 8.74076C9.25514 8.5215 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66667 8 6.66667ZM3.33333 6.66667C3.06963 6.66667 2.81184 6.74487 2.59257 6.89138C2.37331 7.03788 2.20241 7.24612 2.10149 7.48976C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25627 3.07321 9.30772C3.33185 9.35916 3.59994 9.33276 3.84358 9.23184C4.08721 9.13092 4.29545 8.96003 4.44196 8.74076C4.58847 8.5215 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66667 3.33333 6.66667ZM12.6667 6.66667C12.403 6.66667 12.1452 6.74487 11.9259 6.89138C11.7066 7.03788 11.5357 7.24612 11.4348 7.48976C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25627 12.4065 9.30772C12.6652 9.35916 12.9333 9.33276 13.1769 9.23184C13.4205 9.13092 13.6288 8.96003 13.7753 8.74076C13.9218 8.5215 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66667 12.6667 6.66667Z" fill="#D5DAE1"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="chart-graph1-radial-bar">
                            <Chart
                              type="radialBar"
                              series={[result.probabilite_remboursement]}
                              options={{
                                chart: {
                                  type: 'radialBar',
                                  height: 50,
                                  width: 200,
                                },
                                plotOptions: {
                                  radialBar: {
                                    startAngle: -90,
                                    endAngle: 90,
                                    hollow: {
                                      margin: 0,
                                      size: '70%',
                                    },
                                    track: {
                                      background: '#f0f0f0',
                                      strokeWidth: '100%',
                                    },
                                    dataLabels: {
                                      name: {
                                        fontSize: '0px',
                                        color: undefined,
                                        offsetY: 0,
                                      },
                                      value: {
                                        fontSize: '70px',
                                        color: '#111',
                                        formatter: (val) => `${val} %`,
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 800,
                                      },
                                    },
                                  },
                                },
                                colors: [getSolvabilityColor(result.probabilite_remboursement)],
                                stroke: {
                                  lineCap: 'round',
                                },
                              }}
                            />
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-coolGray-500 mt-4 mb-4 text-center">Facteurs déterminants:</p>
                          <div className="flex flex-wrap justify-center gap-4">
                            {result ? (
                              Object.entries(result)
                                .filter(([key]) => key !== 'pret_max_allouable' && key !== 'client_id') // Filtrer les éléments à exclure
                                .map(([key, value], index) => (
                                  <div
                                    key={index}
                                    className="bg-white border border-coolGray-200 rounded-full p-4 shadow-md flex items-center justify-center text-coolGray-800 mb-4"
                                  >
                                    <strong className="mr-2">{key.replace(/_/g, ' ')} </strong> {": " + value}
                                  </div>
                                ))
                            ) : (
                              <div className="bg-white border border-coolGray-200 rounded-full p-4 shadow-md flex items-center justify-center text-coolGray-500">
                                Aucune donnée disponible
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wave wave-bottom w-full text-coolGray-50">
                  <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 51.4091H349.922C606.664 51.4091 859.771 116 1080 116C1300.23 116 1440 51.4091 1440 51.4091V0H0V51.4091Z" fill="currentColor"></path>
                  </svg>
                </div>
              </section>
            )}
            {error && (
              <div className="text-red-500 font-medium mt-4">
                <p>{error}</p>
              </div>
            )}
            {historique.length > 0 && (
              <section className="py-12 bg-coolGray-50 mb-12">
                <div className="container px-4 mx-auto">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-lg font-semibold text-coolGray-800 mb-4 mt-12">Historique des demandes</h2>
                    <div className="flex flex-wrap">
                      {historique.map((entry, index) => (
                        <div key={index} className="w-full md:w-1/2 p-2">
                          <div className="bg-white p-4 rounded-md shadow-sm border border-coolGray-200">
                            <h4 className="text-lg font-semibold text-coolGray-800">Demande {index + 1}</h4>
                            <p><strong>ID client :</strong> {entry.client_id}</p>
                            <p><strong>Montant demandé :</strong> {entry.montant_demande}</p>
                            <p><strong>Taux d'intérêt :</strong> {entry.taux_interet}</p>
                            <p><strong>Période de remboursement :</strong> {entry.periode_remboursement} mois</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
