class MusicHandler{
    start() {
        //hier kan je songs toevoegen
        var songs = ['mistybog.mp3','bensound-psychedelic.mp3', 'pirate.mp3'];

        var SIZE = songs.length;
        var current = 0;
        var numbers = [];
        while (numbers.length < SIZE) {
            var random = Math.floor(Math.random() * SIZE) + 1;
            if (numbers.indexOf(random) === -1) {
                numbers.push(random);
            }
        }
        console.log(numbers);
        var audio = new Audio('shared/sounds/' + songs[numbers[0]-1]);
        audio.volume = 1;
        audio.load();
        audio.play();
        audio.addEventListener('ended',function(){
            audio.pause();
            current++;
            if (current >= SIZE) current = 0;
            audio.src = 'shared/sounds/' + songs[numbers[current]-1];
            audio.load();
            audio.play();
        });

    }
}
