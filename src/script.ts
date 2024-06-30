import { formatDistanceToNow } from 'date-fns';

interface ComicData {
    img: string;
    alt: string;
    safe_title: string;
    year: number;
    month: number;
    day: number;
}

interface Project {
    name: string;
    description: string;
    link: string;
}

document.addEventListener('DOMContentLoaded', async () => {
    const projectList = document.getElementById('project-list') as HTMLElement;

    const projects: Project[] = [
        {
            name: 'Online calculator application',
            description: 'Pet project to dive into HTML, CSS and JavaScript',
            link: 'https://github.com/Rash1d1/calc'
        },
        {
            name: 'Burger restaurant landing',
            description: 'Layout of website for burger restaurant using Figma, HTML5, CSS3, JavaScript',
            link: 'https://github.com/Rash1d1/Burger-Landing'
        },
        {
            name: 'Avito parser',
            description: 'Online Avito parser, focused on gathering info about vacancies. Support asynchrony. Stack used: Python, FastAPI, HTML5, BootStrap, JavaScript.    ',
            link: 'https://github.com/Rash1d1/avito-parser-vacancy'
        }
    ];

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const projectItem = document.createElement('li');
        projectItem.className = 'project-item';

        const projectHeader = document.createElement('button');
        projectHeader.className = 'project-header';
        projectHeader.type = 'button';
        projectHeader.textContent = project.name;

        const projectContent = document.createElement('div');
        projectContent.className = 'project-content';

        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description;

        const projectLink = document.createElement('a');
        projectLink.href = project.link;
        projectLink.textContent = 'View Project';

        projectContent.appendChild(projectDescription);
        projectContent.appendChild(projectLink);
        projectContent.style.overflow = 'hidden';
        projectList.appendChild(projectHeader);

        projectList.appendChild(projectContent);

        projectHeader.addEventListener('click', () => {
            projectHeader.classList.toggle("active");
            const projectContent = projectHeader.nextElementSibling as HTMLElement;
            if (projectContent.style.maxHeight) {
                (projectContent.style.maxHeight as string | null) = null;
                (projectContent.style.marginBottom as string | null) = null;
                (projectContent.style.padding as string | null) = null;
            } else {
                projectContent.style.maxHeight = projectContent.scrollHeight + 'px';
                projectContent.style.marginBottom = '15px';
                projectContent.style.padding = "20px 20px"
            }
        });
    }

    const email = 'r.badamshin@innopolis.university'; // Replace with your email
    const response = await fetch(`https://fwd.innopolis.university/api/hw2?email=${email}`);
    const comicId = await response.text();

    // Fetch comic data
    const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
    const comicData: ComicData = await comicResponse.json();

    // Display comic data
    const comicImg = document.getElementById('comic-img') as HTMLImageElement;
    comicImg.src = comicData.img;
    comicImg.alt = comicData.alt;

    const comicTitle = document.getElementById('comic-title');
    if (comicTitle) {
        comicTitle.textContent = comicData.safe_title;
    }

    const comicDate = document.getElementById('comic-date');
    if (comicDate) {
        comicDate.textContent = formatDistanceToNow(new Date(comicData.year, comicData.month - 1, comicData.day));
    }
});
