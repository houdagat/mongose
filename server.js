//import express
const express = require('express')
// instance express
const app = express()

// import connection_DB
require('dotenv').config();
process.env.MONGO_URI = 'mongodb://localhost:27017/PersonDB'; 
console.log('Valeurs des variables d\'environnement:', process.env);
const connection_DB = require ('./connection_DB')
connection_DB()

// middleware
app.use(express.json());

//Create Many Records
const Person = require('./models/Person');

const createPersons = async () => {
    try {
      // -------create personn 1 ----------------------------------------
      const person1 = await Person.create({ name: 'Amin', age: 38, favorite_foods: ['Couscous', 'pasta'] });
      console.log('Personne créée:', person1);
  
      // -------create personn 2 -------------------------------------------
      const person2 = await Person.create({ name: 'Sejed', age: 8, favorite_foods: ['Pizza', 'pasta',' burritos'] });
      console.log('Personne créée:', person2);

       // ---------create personn 3 ------------------------------------
    const person3 = await Person.create({ name: 'Kenza', age: 12, favorite_foods: ['pizza', 'hamburger',' burritos'] });
    console.log('Personne créée:', person3); 

    } catch (err) {
      console.error('Erreur lors de la création des personnes:', err);
    }
  };
   
  createPersons();
  
// .find() methode--------------------------------------
const getAllPersons = async () => {
    try {
      const allPersons = await Person.find();
      return allPersons;
    } catch (err) {
      console.error('Erreur lors de la récupération des personnes:', err);
      
    }
  };
  
  getAllPersons()
    .then(persons => {
      console.log('Toutes les personnes:', persons);
    })
    .catch(err => {
      console.error('Erreur:', err);
    });

// findOne methode-------------------------------------------
const getPersonByName = async (name) => {
    try {
      const person = await Person.findOne({ name: name });
      return person;
    } catch (err) {
      console.error('Erreur lors de la récupération de la personne:', err);
      
    }
  };
  
    getPersonByName('Sejed')
    .then(person => {
      if (person) {
        console.log('Personne trouvée:', person);
      } else {
        console.log('Aucune personne trouvée avec ce nom.');
      }
    })
    .catch(err => {
      console.error('Erreur:', err);
    });

    // methode findById--------------------------------------
    const getPersonById = async (personId) => {
        try {
          const person = await Person.findById(personId);
          return person;
        } catch (err) {
          console.error('Erreur lors de la récupération de la personne par ID:', err);
          
        }
      };
      
      getPersonById('65ac4b2b97d1b9a41def06c1') 
        .then(person => {
          if (person) {
            console.log('Personne trouvée:', person);
          } else {
            console.log('Aucune personne trouvée avec cet ID.');
          }
        })
        .catch(err => {
          console.error('Erreur:', err);
        });
      
 // UpDate methode -----------------------------
 const updatePersonFavoriteFood = async (personId) => {
    try {
      
      const person = await Person.findById(personId);
  
      if (!person) {
        console.log('Aucune personne trouvée avec cet ID.');
        return;
      }
  
      // Add "hamburger" 
      person.favorite_foods.push('hamburger');
  
      person.markModified('favorite_foods');
  
      await person.save();
  
      console.log('Personne mise à jour:', person);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la personne:', err);
    }
  };
  
   updatePersonFavoriteFood('65ac4b2b97d1b9a41def06c1'); 
         
// Update age : 20-----------------------------

const updatePersonAge = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { $set: { age: 20 } },
      { new: true }
    );

    if (updatedPerson) {
      console.log('Personne mise à jour avec un âge de 20 ans:', updatedPerson);
    } else {
      console.log(`Aucune personne trouvée avec le nom ${personName}.`);
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'âge de la personne:', err);
  }
};

updatePersonAge('Amin');

// Delete methode---------------------

const removePersonById = async (personId) => {
  try {
    const removedPerson = await Person.findOneAndDelete({ _id: personId });

    if (removedPerson) {
      console.log('Personne supprimée:', removedPerson);
    } else {
      console.log(`Aucune personne trouvée avec l'ID ${personId}.`);
    }
  } catch (err) {
    console.error('Erreur lors de la suppression de la personne:', err);
  }
};

removePersonById('65ac564de82f897ffaa5297c');


// delete Mary ------------------------------
const removePersonsByName = async (personName) => {
  try {
    const result = await Person.deleteMany({ name: personName });
    console.log(`Nombre de personnes supprimées avec le nom ${personName}: ${result.deletedCount}`);
  } catch (err) {
    console.error('Erreur lors de la suppression des personnes:', err);
  }
};

// Appel de la fonction
removePersonsByName('Mary');

// Love Burritos------------------------

const findLoversBurritos = () => {
  Person.find({ favorite_foods: 'burrito' }) 
    .sort('name') 
    .limit(2) 
    .select('-age') 
    .then(data => {
      console.log('Burrito lovers:', data);
    })
    .catch(err => {
      console.error('Erreur lors de la recherche des burrito lovers:', err);
    });
};

findLoversBurritos();



// create server 
const port = 5000
app.listen(port,(err)=>{
    err? console.log('errors'): console.log(`server is running on ${port}`)
})

