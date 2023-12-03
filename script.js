//O ASYNC SO DEIXA PROSSEGUIR APOS O GET PUXAR A API
const stars = []
async function getBodies(){
      console.log('buscando dados...')
      const result = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
      stars.push(...result.data.bodies)
       isPlanets() 
       getEarth() 
       planetsNoMoon()
       planetsNames()
       planetSize()
       planetsString()
       compactPlanets()
       ringsMoons()
       descoveryPlanets()
       findAstro("Moon")
       temperaturaPlanets()
       planetasSeparados()
       ordenacaoComplexa()
       planetaOrbitado()
       mediaMassaPlanetas()
       distanciaSaturnoPlutao()
       planetasComLuas()
       desafioFinal()
       

}
getBodies(); 
console.log(stars);

/* 1. Consuma a API: Utilize o endpoint /bodies para obter uma lista de corpos celestes. Armazene esses dados em um array para futuras operações. 
● Detalhes: Use axios para fazer a requisição à API. Certifique-se de tratar possíveis erros que possam ocorrer durante a requisição.  */
/* 2. Filtre os Planetas: Use o método filter para criar um novo array contendo apenas planetas. 
● Detalhes: Cada objeto da API contém um campo que especifica o tipo do corpo celeste (por exemplo, planeta, estrela, lua, etc.). Use esse campo como critério para o filtro.  */

 function isPlanets(){
      console.log(stars.filter(body => body.isPlanet === true));
}  


/* const buscaPlanetas = getBodies() */
/* 3. Encontre a Terra: Use o método find para encontrar o objeto que representa a Terra no array filtrado. 
● Detalhes: Você deve procurar pelo objeto cujo campo de nome seja igual a "Earth". */
function getEarth(){
            const findEarth = stars.find((planet) => {
                  return planet.englishName === 'Earth'
            })
            console.log(findEarth);
} 

/* 4. Verifique Condições com some: Use o método some para verificar se algum planeta no array filtrado não tem luas. 
● Detalhes: Alguns planetas não possuem luas e isso é especificado em um dos campos do objeto. Use esse campo para realizar a verificação.  */

 function planetsNoMoon(){
      return console.log(stars.some(moon => !moon.moons)); 
}  

/* 5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas. 
● Detalhes: O novo array deve ser uma lista de strings, onde cada string é o nome de um planeta.  */

function planetsNames(){
      console.log(stars.map(names => names.id));
} 

/* 6. Classificação por Tamanho: Use os métodos map e sort para criar um novo array que contenha os nomes dos planetas, ordenados pelo seu tamanho (raio). 
● Detalhes: Utilize map para extrair os raios e os nomes dos planetas em um novo array. Depois, use sort para ordenar esse array com base no raio.  */

function planetSize(){
      //meanRadius
      let planetas = [] 
      stars.map((planet) =>{
       if(planet.isPlanet === true){
            planetas.push(planet.id)
            planetas.sort((a,b)=> a.meanRadius - b.meanRadius)
       }
      })
      console.log(planetas);
} 
/* 7. Informações Concatenadas: Use o método join para criar uma string que contenha os nomes de todos os planetas do array, separados por vírgulas. 
● Detalhes: A string resultante deve ser algo como "Mercúrio, Vênus, Terra, Marte,...".  */
function planetsString(){
      let planetas = []
      stars.forEach((planeta) =>{
      if(planeta.isPlanet === true) 
            planetas.push(planeta.id)
      })
      let planetaStrings = planetas.join(", ")
      console.log(planetaStrings);
} 
/* 8. Sistema Solar Compacto: Use os métodos para pegar os 5 menores planetas e calcular a massa total desses planetas.  */

function compactPlanets(){
      let planetas = [];
    
      stars.map((bd) => {
          if (bd.isPlanet === true) {
              planetas.push({
                  nome: bd.englishName,
                  raio: bd.meanRadius,
                  massa: Math.pow(bd.mass.massValue,bd.mass.massExponent)              
              });
          }
      });
  
      planetas.sort((a, b) => a.raio - b.raio);
      planetas.splice(5,3)
      const somaMassas = planetas.reduce((acc,planeta)=>{
          return acc+planeta.massa
      },0)
      return console.log(somaMassas);
} 


/* 9. Anéis e Luas: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas que tem densidade maior que 3.34400.  */

function ringsMoons(){
     let planets = []
     stars.map((planet)=>{
      if(planet.isPlanet === true){
            if(planet.moons && planet.moons.length > 2){
                  if(planet.density > 1){
                        planets.push(planet)
                  }
            }
      }
     })
     return console.log(planets);
} 

/* 10. Ordem de descobrimento: Encontre e imprima na tela todos nomes dos planetas e suas respectivas datas de descoberta, ordenando-os do mais recente ao mais antigo.  */

function descoveryPlanets(){
      let astrosAno = [];
    stars.map((planet)=>{
        if(planet.discoveryDate){
            planet.discoveryDate.split('/')
            astrosAno.push({
                nome: planet.englishName,
                dia:Number(planet.discoveryDate.split('/')[0]),
                mes:Number(planet.discoveryDate.split('/')[1]),
                ano:Number(planet.discoveryDate.split('/')[2])    
            })
        }
    })
    astrosAno.forEach(element => {
      if(!element.ano){
            element.ano = element.dia
            element.dia = NaN
      }
    })
    astrosAno.sort((a,b)=>{
      if(a.ano !== b.ano){
            return b.ano - a.ano
      } else if(a.mes !== b.mes){
            return b.mes - a.mes
      } else{
            return b.dia - a.dia
      } 
      
})
      return console.log(astrosAno);     
}

/* 11. Encontrando Astro: Faça uma função que recebe um nome, e retorna a distancia, a massa, gravidade e densidade */ 
function findAstro(planeta){
      let planetaEncontrado = []
      stars.find((planet) => {
            if(planet.englishName === planeta)
            console.log(planet);
             planetaEncontrado.push({
                  nome: planet.englishName,
                  densidade: planet.density,
                  //massa: Math.pow(planet.mass.massValue,planet.mass.massExponent), 
                  gravidade: planet.gravity,
                  MaiorDistanciaSol: planet.aphelion
            })
      })
      return console.log(planetaEncontrado);
}
/* 12. Filtro de Temperatura: econtre os planetas que tem uma temperatura de 8 a 30 graus celsius. Cuidado que o AvgTemp está na escala Kelvin. Ordene-os do mais frio ao mais quente.*/
function temperaturaPlanets(){
      let planets = []
      stars.filter((planet)=>{
            if(planet.avgTemp-273.15>=8&&planet.avgTemp-273.15<=30){
                planets.push({
                    nome:planet.englishName,
                    temperatura:planet.avgTemp-273
                })
            }
        })
      planets.sort((a,b) => a.avgTemp - b.avgTemp)
      return console.log(planets);
}

/* 13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os planetas pelo seu tipo. bodyType  */
let planetasObj = {}
function planetasSeparados() {
      stars.map(planet => {
          if (planetasObj[planet.bodyType] === undefined) {
              planetasObj[planet.bodyType] = []
          }
          planetasObj[planet.bodyType].push(planet)
  
      })
      console.log(planetasObj);
  }
/* 14. Ordenação Complexa: Use sort e slice para ordenar os planetas primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.  */
 function ordenacaoComplexa() {

      for (let planet in planetasObj) {
          const ordem = planetasObj[planet].sort((a, b) => b.equaRadius - a.equaRadius)
          const ordemSlice = ordem.slice(0, 3)
          console.log(ordemSlice);
  
      }
} 
/* 15. Encontrando planetas orbitados. Encontre todos os planetas que são orbitados por pelo menos um corpo celeste. Imprima na tela o nome do planeta e seus orbitadores.  */
 function planetaOrbitado(n) {
      const orbitado = stars.filter(planet => {
          return planet.aroundPlanet != null
      })
      orbitado.forEach(planet => {
          console.log(planet.name, planet.aroundPlanet);
      })
  
  } 
/* 16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.  */
function mediaMassaPlanetas(n) {
      const planetas = stars.filter(planet => planet.bodyType === 'Planet')
      const soma = planetas.reduce((acc, currentValue) => {
          return acc + currentValue.mass.massValue * Math.pow(10, currentValue.mass.massExponent)
      }, 0)
  
      const media = soma / planetas.length
      console.log(media);
  }
/* 17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas  */
 function distanciaSaturnoPlutao() {
      const aphelion = stars.find(planet => planet.id === 'saturne').aphelion
      const perihelion = stars.find(planet => planet.id === 'pluton').perihelion
      console.log(perihelion - aphelion);
  } 
/* 18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem.  */
function planetasComLuas(n) {
      stars.forEach(planet => {
          if (planet.moons != null) console.log(planet.name, planet.moons.length);
      })
  }
/* 19. O Desafio Final em Manipulação de Dados e Cálculos 
Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar. 
- Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.). 
- Crie um novo array que contém apenas as massas dos planetas. - Ordene o array de massas em ordem crescente. 
- Calcule a mediana das massas dos planetas. A mediana é o valor do meio em um conjunto de dados ordenado. Se o conjunto tem um número ímpar de observações, a mediana é o valor do meio. Se o conjunto tem um número par de observações, a mediana é a média dos dois valores do meio. 
- Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada. */
 function desafioFinal(n) {
      const arrayPlanetas = stars.filter(planet => planet.isPlanet)
      console.log(arrayPlanetas);
      const massas = arrayPlanetas.map(call => call.mass.massValue * Math.pow(10, call.mass.massExponent))
      massas.sort((a, b) => a - b)
  
      console.log(massas);
      let indice1 = 0
      let indice2 = 0
      let indice = Math.floor(massas.length / 2)
  
      if (massas.length % 2 === 0) {
          console.log('par');
          indice1 = (massas.length / 2) - 1
          indice2 = massas.length / 2
          const medianaPar = (massas[indice1] + massas[indice2]) / 2
          console.log(medianaPar);
          const nomeDeles = arrayPlanetas.filter(call => call.mass.massValue * Math.pow(10, call.mass.massExponent) >= massas[indice1] && call.mass.massValue * Math.pow(10, call.mass.massExponent) <= massas[indice2])
          console.log('planetas mais próximos da mediana:', nomeDeles);
  
      } else {
          console.log('impar');
          const medianaImpar = massas[Math.floor(massas.length / 2)]
          console.log(medianaImpar);
          const nomeDele = arrayPlanetas.filter(call => call.mass.massValue * Math.pow(10, call.mass.massExponent) === massas[indice])
          console.log('planeta mais próximo da mediana:', nomeDele);
      }
  
  } 