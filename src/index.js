const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');

const csvPath = path.resolve(__dirname, '..', 'temp', 'brasil.csv');


async function Read() {
  const output = [];

  const readerCSV = csvParse({
    from_line: 2,
  });


  const startRead = new Date().getTime();
  const ReadStream = fs.createReadStream(csvPath);
  const parseCSV = ReadStream.pipe(readerCSV);

  const startParse = new Date().getTime();
  parseCSV.on('data', async (line) => {
    const [
      Number,
      Gender,
      NameSet,
      Title,
      GivenName,
      Surname,
      StreetAddress,
      City,
      State,
      ZipCode,
      CountryFull,
      EmailAddress,
      Username,
      Password,
      TelephoneNumber,
      Birthday,
      CCType,
      CCNumber,
      CVV2,
      CCExpires,
      NationalID,
      Color,
      Kilograms,
      Centimeters,
      GUID
    ] = line.map(cell => cell.trim());
    
    output.push({
      Number,
      Gender,
      NameSet,
      Title,
      GivenName,
      Surname,
      StreetAddress,
      City,
      State,
      ZipCode,
      CountryFull,
      EmailAddress,
      Username,
      Password,
      TelephoneNumber,
      Birthday,
      CCType,
      CCNumber,
      CVV2,
      CCExpires,
      NationalID,
      Color,
      Kilograms,
      Centimeters,
      GUID
    });
  });
  
  await new Promise(resolve => parseCSV.on('end', resolve));
  const finishParse = new Date().getTime();
  const finishRead = new Date().getTime();

  const startWrite = new Date().getTime();
  const jsonPath = path.resolve(__dirname, '..', 'temp', 'brasil.json');
  const Writestream = fs.createWriteStream(jsonPath);

  Writestream.write(JSON.stringify(output));
  const finishWrite = new Date().getTime();

  ShowTimes(finishRead - startRead, finishParse - startParse, finishWrite - startWrite);
}

function ShowTimes(readTime, parseTime, writeTime) {
  console.log('✔ Conversão concluída com sucesso.');
  console.log('Tempos:');
  
  const times = {
    tempo_leitura: readTime,
    tempo_conversao: parseTime,
    tempo_gravacao: writeTime,
  };

  console.table(times);
}

Read();
