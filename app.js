/*essas duas linhas iniciais são a sintaxe padrão para iniciar o mongoose*/
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruits_project")
// abaixo o código que estrutura o banco de dados com o Mongoose,
//passando o tipo ou fazendo uma validação com alguma buit-in validator
//como a required que torna obrigatório o preenchimento do campo e dá
//uma mensagem quando não é preenchido ou
// o min e max para números
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required:[true, "Please check your data entry, no name specified!"]
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
// o código abaixo cria uma coleção, se usa a palavra no singular e o Mongoose já
//converte para o plural
const Fruit = mongoose.model("Fruit", fruitSchema );

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

fruit.save();
/*Já o código abaixo é para criar um novo banco de dados de pessoas e o
campo favouriteFruit é para relacionar esse db ao de Fruits*/
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
  name:"pineapple",
  score: 9,
  review: "de marataizes"
});

pineapple.save();

const person = new Person({
  name: "amy",
  age: 12,
  favouriteFruit:
});

person.save();
//o código abaixo serve para inserir vários elementos
// Fruit.insertMany([orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Saved all the fruits")
//   }
// });
/*o código abaixo é para a função de localizar, ele aceita dois argumentos como
callback, o primeiro, o erro, o segundo, o elemento a ser encontrado.
A função com o close é uma boa prática para fechar o mongoose na última função
do sistema
Já o forEach vai separar cada elemento do determinado tipo, nesse caso, name
*/
Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close()
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
/*já o código abaixo serve para atualizar algum elemento, primeiro se
passa um identificador único do elemento, depois o que se quer mudar e para qual
dado. Também tem a função para deletar um elemento ou vários na documentação */
Fruit.updateOne({_name: "apple"}, {name: "tangerina"},
function(err){
  if (err){
    console.log(err)
  }else{
    console.log("deu bom")
  }
})
