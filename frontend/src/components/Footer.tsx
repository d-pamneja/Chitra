import { socials } from "../structure/navigation"

const Footer = () => {

    return(
        <footer className="bg-black border-t py-10 border-neutral-700">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-md font-semibold mb-4 ml-2 gap-3">Socials</h3>
                    <ul>
                        {socials.map((link,index)=>( 
                            <a className='text-neutral-300 hover:text-white ml-2 mr-2' key={index} target="_blank" href={link.path}>{link.name}</a>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer