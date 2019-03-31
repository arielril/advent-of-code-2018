const R = require('ramda');
const rl = require('readline').createInterface({
  input: process.stdin,
});

function run1() {
  const list = [];

  rl.on('line', input => list.push(input))
    .once('close', () => {
      let two = 0;
      let three = 0;

      for (const s of list) {
        const x = R.pipe(
          R.split(''),
          R.uniq,
          R.map(lt => s.split(lt).length - 1),
          R.uniq,
        )(s);
        
        const has2 = x.find(v => v === 2);
        const has3 = x.find(v => v === 3);

        if (has2) {
          two += 1;
        }
        if (has3) {
          three += 1;
        }
      }
      console.log('Two:', two, 'Three:', three);
      console.log('Result:', two * three);
    });
}

function run2() {
  const list = [];

  rl.on('line', input => list.push(input))
    .once('close', () => {
      let check = [];

      for (let i = 0; i < list.length; i += 1) {
        const s = list[i].split('');
        let add = true;

        for (let j = i + 1; j < list.length; j += 1) {
          const sj = list[j].split('');
          let sd = 0;
          
          for (let k = 0; k < sj.length; k += 1) {
            if (sj[k] !== s[k])
              sd += 1;
          }
          
          if (sd <= 1) {
            check.push(s.join(''));
            check.push(sj.join(''));
          }   
        }
      }

      const res = [];
      check = R.pipe(
        R.uniq,
        R.map(R.split('')),
      )(check);

      for (let j = 0; j < check[0].length; j += 1) {
        const letter = check[0][j];
        let add = true;

        for (let i = 1; i < check.length; i += 1) {
          if (letter !== check[i][j]) {
            add = false;
            break;
          }
        }

        if (add) {
          res.push(letter);
        }
      }
      console.log('Result:', res.join(''));
    });
}



function run() {
  const part = process.argv[2];

  switch (part) {
    case 'part-1':
      run1();
      break;
    case 'part-2':
      run2();
      break;
  }
}

run();