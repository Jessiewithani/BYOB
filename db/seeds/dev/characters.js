const charactersData = require('../../../charactersData');

const createCharacter = async (knex, character) => {
  const characterId = await knex('characters').insert({
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type
  }, 'id');

  let versionsPromises = character.versions.map(version => {
    return createVersion(knex, {
      name: version.name,
      status: version.status,
      species: version.species,
      type: version.type,
      location: version.location,
      characters_id: characterId[0]
    })
  })

  return Promise.all(versionsPromises)
};

const createVersion = (knex, version) => {
  return knex('versions').insert(version);
};

exports.seed = async (knex) =>{
  try {
    await knex('versions').del()
    await knex('characters').del()

    let characterPromises = charactersData.map(character => {
      return createCharacter(knex, character);
    });

    return Promise.all(characterPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
