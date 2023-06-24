import React, {useEffect} from "react";

const About = () => {
    useEffect(() => {
        document.title = "MDS | About"
    })

    const timeline = [
        {
            name: 'Team Building',
            description:
                'Total of 4 team members have been selected',
            date: 'Dec 2022',
            dateTime: '2022-12',
        },
        {
            name: 'Project Planning',
            description:
                'Project planning and design phase',
            date: 'May 2023',
            dateTime: '2023-05',
        },
        {
            name: 'Released beta',
            description:
                'Designed and developed a fully functional beta product',
            date: 'August 2023',
            dateTime: '2023-08',
        },
        {
            name: 'Global launch of product',
            description:
                'Product Showcase at SJSU Expo 2023',
            date: 'Dec 2023',
            dateTime: '2022-12',
        },
    ]

    const values = [
        {
            name: 'Be world-class',
            description:
                'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
        },
        {
            name: 'Share everything you know',
            description:
                'Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.',
        },
        {
            name: 'Always learning',
            description:
                'Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.',
        },
        {
            name: 'Be supportive',
            description:
                'Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.',
        },
        {
            name: 'Take responsibility',
            description:
                'Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.',
        },
        {
            name: 'Enjoy downtime',
            description:
                'Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.',
        },
    ]
    const team = [
        {
            name: 'Faramarz Mortezaie',
            role: 'Project Advisor',
            imageUrl: '/male.svg',
        },
        {
            name: 'Shohin Abdulkhamidov',
            role: 'Full-Stack Developer',
            imageUrl: '/male.svg',
        },
        {
            name: 'Diego Ruben-Cruz',
            role: 'Team Leader',
            imageUrl: '/male.svg',
        },
        {
            name: 'Spartak Gevorgyan',
            role: 'Hardware Engineer',
            imageUrl: '/male.svg',
        },
        {
            name: 'Diego Garcia-Carrasco',
            role: 'Backend Developer',
            imageUrl: '/male.svg',
        },
        // More people...
    ]

    return (
        <>
            <div className="flex justify-center  text-center flex-col py-10 items-center">
                {/* Hero section */}
                <div className="relative isolate -z-10 rounded-lg overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                    <div
                        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                        aria-hidden="true"
                    />
                    <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-rose-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                                We’re a passionate group of people working from around the world to build the future of DYI Security systems.
                            </h1>
                            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                                <p className="text-lg leading-8 text-gray-600">
                                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                                    amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                                    irure qui lorem cupidatat commodo.
                                </p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                                alt=""
                                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
                </div>
            </div>

            {/* Timeline section */}
            <div className="mx-auto -mt-8 pt-16 max-w-7xl px-6 lg:px-8">
                <h1 className="text-6xl text-rose-900 font-bold pb-10 ">How It Started</h1>
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {timeline.map((item) => (
                        <div key={item.name}>
                            <time
                                dateTime={item.dateTime}
                                className="flex items-center text-sm font-semibold leading-6 text-rose-900"
                            >
                                <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                    <circle cx={2} cy={2} r={2} fill="currentColor"/>
                                </svg>
                                {item.date}
                                <div
                                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                    aria-hidden="true"
                                />
                            </time>
                            <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-rose-900">{item.name}</p>
                            <p className="mt-1 text-base leading-7 text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image section */}
            <div className="mt-16 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt=""
                    className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                />
            </div>

            {/* Values section */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-40 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Our values</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate
                        veritatis in
                        accusamus quisquam.
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {values.map((value) => (
                        <div key={value.name}>
                            <dt className="font-semibold text-rose-900">{value.name}</dt>
                            <dd className="mt-1 text-gray-600">{value.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Team section */}
            <div className="mx-auto pb-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Our team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos totam in dolorum. Nemo vel
                        facere
                        repellendus ut eos dolores similique.
                    </p>
                </div>
                <ul
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                >
                    {team.map((person) => (
                        <li key={person.name}>
                            <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt=""/>
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-rose-900">{person.name}</h3>
                            <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                        </li>
                    ))}
                </ul>
            </div>


        </>
    );
}

export default About