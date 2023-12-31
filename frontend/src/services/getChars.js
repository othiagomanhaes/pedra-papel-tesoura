import coisa from '../imgs/coisa.jpg';
import edward from '../imgs/edward.jpg';
import geodude from '../imgs/geodude.jpg';
import konan from '../imgs/konan.jpg';
import scyter from '../imgs/scyter.jpg';
import simon from '../imgs/simon.jpg';
 
const CharsArray = {
    tesoura: [scyter, edward],
    papel: [simon, konan],
    pedra: [geodude, coisa]
}

function randomNumberZEROeUM() {
    return Math.floor(Math.random() * 2);
}

const Chars = {
    tesoura: CharsArray.tesoura[randomNumberZEROeUM()],
    papel: CharsArray.papel[randomNumberZEROeUM()],
    pedra: CharsArray.pedra[randomNumberZEROeUM()],
    // pedra: coisa,
}

export default Chars;
