/*Alert*/
async function presentAlert(header, subHeader, message) {
  const alert = document.createElement('ion-alert');
  alert.header = 'Ben4you Technology';
  alert.subHeader = 'The program is working with Ben';
  alert.message = 'A message should be a short, complete and full sentence.';
  alert.background = 'darkgrey';
  alert.buttons = ['Ok'] ['Cancel'];
  
  
  document.body.appendChild(alert);
  await alert.present();
}


