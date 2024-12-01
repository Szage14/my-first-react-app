import ProfilePic from './assets/me.jpg';

function Card(){
    return (
        <div className="card">
            <img className='card-image' src={ProfilePic} alt="profile picture" />
            <h2 className='card-title'>Cristian Jay Buquis</h2>
            <p className='card-text'>CSU Main-Student</p>
        </div>
    )
}

export default Card;