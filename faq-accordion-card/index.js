const accordion = document.querySelector('.card__accordion');
const accordionHeadings = document.getElementsByClassName('card__accordion-heading');
const accordionPanels = document.getElementsByClassName('card__accordion-panel');

const buttonIdTemplate = 'card__accordion-button--';
const panelIdTemplate = 'card__accordion-panel--';

function addIndicatorIconTo(container) {
	const iconMarkup = `
        <svg class="card__accordion-icon" width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 .799l4 4 4-4" stroke="#F47B56" stroke-width="2" fill="none" fill-rule="evenodd"/>
        </svg>`;

	container.insertAdjacentHTML('beforeend', iconMarkup);
}

function enhanceAccordionPanels() {
	for (let i = 0; i < accordionPanels.length; i++) {
		const panel = accordionPanels[i];
		panel.classList.add('hidden');
		// first panel would have an id of card__accordion-panel--1, and so on
		panel.id = `${panelIdTemplate}${i + 1}`;
		// each panel will be labeled by its associated button
		panel.setAttribute('aria-labelledby', `${buttonIdTemplate}${i + 1}`);
	}
}

function enhanceAccordionHeadings() {
	for (let i = 0; i < accordionHeadings.length; i++) {
		const heading = accordionHeadings[i];
		const headingText = heading.textContent;
		const button = document.createElement('button');

		button.textContent = headingText;
		heading.textContent = '';

		addIndicatorIconTo(button);

		button.classList.add('card__accordion-button');
		button.id = `${buttonIdTemplate}${i + 1}`;
		button.ariaExpanded = 'false';
		// each button will control the visibility of its associated panel
		button.setAttribute('aria-controls', `${panelIdTemplate}${i + 1}`);

		heading.appendChild(button);
	}
}

function toggleAccordionPanel(e) {
	const button = e.target.closest('.card__accordion-button');
	if (!button) return;

	const associatedPanelId = button.getAttribute('aria-controls');
	const associatedPanel = document.getElementById(associatedPanelId);
	const associatedIcon = button.querySelector('.card__accordion-icon');

	associatedPanel.classList.toggle('hidden');
	associatedIcon.classList.toggle('rotate-icon-up');
	button.ariaExpanded = button.ariaExpanded === 'true' ? 'false' : 'true';
}

function enhanceAccordion() {
	enhanceAccordionHeadings();
	enhanceAccordionPanels();
	accordion.addEventListener('click', toggleAccordionPanel);
}
// Progressively enhance the accordion (make it interactive and maintain accessibility) with JavaScript
enhanceAccordion();
