function start() {
	let i = 0;
	const modalShadow = document.querySelector('.modal-shadow');
	const closeBtn = document.querySelector('.close-btn');
	const liItem = document.querySelectorAll('li');
	closeBtn.addEventListener('click', handleModal);

	function handleModal() {
		if (i === 0) {
			modalShadow.classList.remove('hidden');
		}
		if (i > 0) {
			liItem[i - 1].classList.remove('active');
		}
		if (i === 2) {
			closeBtn.classList.add('color-btn');
			closeBtn.textContent = 'Close';
			closeBtn.removeEventListener('click', handleModal);
			handleApp();
		}
		liItem[i].classList.add('active');
		i++;
		hadleAnimation(i)
	}
}

const hexValues = document.querySelectorAll('.color-hex');
hexValues.forEach(hex =>
	hex.addEventListener('click', () => {
		const copyText = hex.textContent;
		navigator.clipboard.writeText(copyText);
		document.querySelector('input').value = copyText;
	})
);

function hadleAnimation(p) {
	console.log(p);
	document.querySelector(`.p${p}`).classList.add('active');
	p > 0 && document.querySelector(`.p${p-1}`).classList.remove('active');
}

function handleApp() {
	document.querySelectorAll('.color-btn').forEach(button =>
		button.addEventListener('click', () => {
			document.querySelectorAll('.to-hide').forEach(el => el.classList.add('hidden'));
			const colorValue = document.querySelector('input').value.slice(1);
			const modeValue = document.querySelector('select').value.toLowerCase();
			document.querySelectorAll('.color').forEach(div => {
				div.childNodes[0] ? div.childNodes[0].remove() : '';
			});

			fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${modeValue}&count=5`)
				.then(res => res.json())
				.then(data => {
					let i = 0;
					document.querySelectorAll('h2').forEach(el => {
						el.innerHTML = data.colors[i].hex.value;
						i++;
					});
					let j = 0;
					document.querySelectorAll('.color').forEach(div => {
						div.style.backgroundColor = data.colors[j].hex.value;
						j++;
					});

					let k = -1;
					const arr = new Array(data.colors.length).fill(0).map(el => {
						k++;
						return data.colors[k].name.value;
					});
					let l = 0;
					for (el of arr) {
						const p = document.createElement('p');
						p.classList.add('description');
						p.textContent = el;
						document.querySelectorAll('.color')[l].append(p);
						l++;
					}
				});
		})
	);
}

start();
