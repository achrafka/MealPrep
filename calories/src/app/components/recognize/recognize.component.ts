import { Component, OnInit } from '@angular/core';
import Clarifai from 'clarifai';
import * as $ from 'jquery';
@Component({
  selector: 'app-recognize',
  templateUrl: './recognize.component.html',
  styleUrls: ['./recognize.component.css']
})
export class RecognizeComponent implements OnInit {
  constructor() { }

  myClarifaiApiKey = 'd4671ee01e9e4d0a8a4df3442175c087';

  app = new Clarifai.App({apiKey: this.myClarifaiApiKey});
  ngOnInit() {

  }

   predictClick = (value, source) => {

    const file    = document.querySelector<HTMLInputElement>('input[type=file]').files[0];
    const preview = $('.food-photo');
    const loader  = 'https://s3.amazonaws.com/static.mlh.io/icons/loading.svg';
    const reader: any  = new FileReader();

    reader.addEventListener('load', () => {
      preview.attr('style', 'background-image: url("' + reader.result + '");');
      this.doPredict({ base64: reader.result.split('base64,')[1] });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
      $('#concepts').html('<img src="' + loader + '" class="loading" />');

    }
    return false;
  }
    predictButton = (value, source) =>  {

    const file =  document.querySelector<HTMLInputElement>('input[type=file]').files[0];
    const prediction = document.getElementById('predictButtons') as HTMLButtonElement;
    if (file) {
     prediction.disabled  = false ;
     prediction.style.backgroundColor = 'green';
     prediction.style.cursor = 'pointer';
    }

  }
   doPredict = (value) => {
    this.app.models.predict(Clarifai.FOOD_MODEL, value).then(async (response) => {
      if (response.rawData.outputs[0].data.hasOwnProperty('concepts')) {
        const tag = response.rawData.outputs[0].data.concepts;
        const tagG = response.rawData.outputs[0].data.concepts[0].name;
        let chaine = '';
        let i = 0 ;
        for (const abc in tag) {
           if (i < 2) {
           chaine += tag[abc].name + ' / ';
           i++;
          }
         }

        const res = await fetch('../../../assets/data.json');
        const data = await res.json();
        const nameP = data[0][tagG];

        if (!nameP) {
            const c = `Sorry the nutritional values of ${tagG} dosen't exist`;
            $('#concepts').html('<h2>' + chaine + '</h2>' + '<p>' + c + '</p>');
            $('.titres').css('display', 'none');

          } else {

          const ab = data[0][tagG].values;
          const abRest = data[0][tagG].rest;
          let arr: any;
          let arrR: any;

          // for (let i = 0 ; i<abRest.length; i++) {
          //   restChaine = Array.from(abRest).split(/[:]+/g);
          //  console.log(restChaine);
          // }
          arr = Array.from(ab);
          arrR = Array.from(abRest);

          let calEquation: any;
          let cal: any;
          let lip: any;
          let sod: any;
          let chol: any;
          const awel = arr.shift();


          calEquation =  parseFloat(arr[0].match(/[\d.\d]+/g).map(Number));
          await $('#calories_activity').html(calEquation);
          const btnV = document.getElementById('voire');
          btnV.onclick =  () => {
         const poid = document.querySelector<HTMLInputElement>('input[type=number]').value ;


         const equationWalk = calEquation * 200 / ( 3.5 * 3.5 * parseFloat(poid));
         if (equationWalk > 60) {
            const h = Math.floor(equationWalk / 60);
            const m = Math.round(equationWalk % 60) ;
            const h_m = `${h} Heure(s) et ${m} minutes`;
            $('#time_walking').html( h_m);
            $('#walking_').css('display', 'none');

          } else {

            $('#time_walking').html(Math.round(equationWalk));
          }
         const equationRunning = calEquation * 200 / ( 7 * 3.5 * parseFloat(poid));
         if (equationRunning > 60) {
            const h = Math.floor(equationRunning / 60);
            const m = Math.round(equationRunning % 60) ;
            const h_m = `${h} Heure(s) et ${m} minutes`;
            $('#time_running').html( h_m);
            $('#running_').css('display', 'none');

          } else {

            $('#time_running').html(Math.round(equationRunning));
          }
         const equationWatching = calEquation * 200 / ( 1 * 3.5 * parseFloat(poid));
         if (equationWatching > 60) {
            const h = Math.floor(equationWatching / 60);
            const m = Math.round(equationWatching % 60) ;
            const h_m = `${h} Heure(s) et ${m} minutes`;
            $('#time_watching').html( h_m);
            $('#watching_').css('display', 'none');

          } else {

            $('#time_watching').html( Math.round(equationWatching));
          }
         $('.all_activity').css('display', 'block');

        };
          cal = arr[0];
          lip = arr[1];
          sod = arrR[1];
          chol = arrR[0];

          const x = arr.toString().replace(/[,]+/g, '<br class="br_"><hr>');
          const y = arrR.toString().split(/[:,]+/g);
          let restChaine = '';
          let restChaineNumber = '';
          for (let i = 0; i < y.length; i++ ) {
            if (i % 2 === 0) {
              restChaine += `<p >${y[i]}</p>` ;
              $('#name_nut').html(restChaine);
            } else if (i % 2 !== 0) {
              restChaineNumber += `<p class="ligne_">${y[i]}</p>`;
              $('#num_nut').html(restChaineNumber );


            }

          }


          const calString = cal.toString(ab);
          const lipString = lip.toString(ab);
          const sodString = sod.toString(abRest);
          const cholString = chol.toString(abRest);

          const numCal = calString.match(/[\d.\d]+/g).map(Number);
          const numLip = lipString.match(/[\d.\d]+/g).map(Number);
          const numSod = sodString.match(/[\d.\d]+/g).map(Number);
          const numChol = cholString.match(/[\d.\d]+/g).map(Number);

          const restCalories = 2000 - parseFloat(numCal);
          const restLipides = 67 - parseFloat(numLip);
          const restSoduim = 2300 - parseFloat(numSod);
          const restCholesterol = 300 - parseFloat(numChol);

          const percentageCal = (parseFloat(numCal) / 2000) * 100;
          const percentageLip = (parseFloat(numLip) / 67) * 100;
          const percentageSod = (parseFloat(numSod) / 2300) * 100;
          const percentageChol = (parseFloat(numChol) / 300) * 100;

          // tslint:disable-next-line: max-line-length
          $('#concepts').html('<h2>' + chaine + '</h2>' + '<p class=\'awel-phrase\'>' + awel + '</p><p class=\'rest_phrase\'>' + x + '</p>');
          $('#cal_rest').html(restCalories);
          $('#cal_total').html(numCal);
          $('#bar_calorie').css('width', `${percentageCal}%`);
          $('#lip_rest').html(restLipides);
          $('#lip_total').html(numLip);
          $('#bar_Lipides').css('width', `${percentageLip}%`);
          $('#sod_rest').html(restSoduim);
          $('#sod_total').html(numSod);
          $('#bar_sodium').css('width', `${percentageSod}%`);
          $('#chol_rest').html(restCholesterol);
          $('#chol_total').html(numChol);
          $('#bar_cholesterol').css('width', `${percentageChol}%`);


            //  $('#nutritional_name').html(numChol);

          $('.titres').css('display', 'block');

          }




        }
      }
    );
  }

}

