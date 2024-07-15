import '../styles/Navbar.css'

interface NavbarProps {
    currView: string | null;
    setCurrView: React.Dispatch<React.SetStateAction<string | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrView }) => {

    const views: string[] = ['Persons', 'Results'];
  
    return (
      <div className='navbar'>
        {views.map((view: string, idx: number) => (
          <div key={idx}>
            <p onClick={() => setCurrView(view)}>{view}</p>
          </div>
        ))}
      </div>
    )
}

export default Navbar