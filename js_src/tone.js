module.exports = function() {
    var Tone = require('tone')
	Tone.Transport.bpm.value = 80;
	Tone.Transport.loop = false;
	const sampler = new Tone.Sampler({
		// 音源のパスを設定する。
		'C1' : 'js_src/tones/「よくできました」.mp3',
		'E1' : 'js_src/tones/ジャジャーン.mp3',
		'D1' : 'js_src/tones/「当ったり～」.mp3',
		'F1' : 'js_src/tones/「合格です」.mp3',
	}, ()=>{
		console.log('initialized')
	}).toDestination();
	const sound = note => {
		const cell = document.querySelector('[data-note="'+note+'"]');
		sampler.triggerAttackRelease(note, 3);
		cell.style.animationName = 'fade1';
		setTimeout(()=>{
			cell.style.animationName = '';
		}, 4000)
	}
	const beatbox = document.getElementById('petit-beatbox');
	beatbox.querySelectorAll('button').forEach(button=>{
		button.onclick = e => {
			sound(e.currentTarget.dataset.note)
		};
	});
	document.body.onkeypress = e => {
		if (e.code === 'KeyA') {
			sound('C1');
		} else if (e.code === 'KeyS') {
			sound('E1');
        } else if (e.code === 'KeyD') {
			sound('D1');
		} else if (e.code === 'KeyF') {
			sound('F1');
		}
	}
};