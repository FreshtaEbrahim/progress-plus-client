import Avatar from '../components/Avatar';
import UsefulLinks from '../components/UsefulLinks';
import NavBar from '../components/NavBar';
import { bootcamperNavBarArr } from '../libs/globalVariables/navBarArrays';
import serverSideProps from '../libs/functions/serverSideProps';
import LoadingImg from '../components/LoadingImg';

export default function RecapTasks({ session }) {
  if (!session) {
    return <LoadingImg />;
  }
  return (
    <div>
      <header className='header'>
        <Avatar src={session.picture} name={session.name} />
        <NavBar linksAndTitles={bootcamperNavBarArr} />
        <button
          onClick={() => {
            console.log(session);
          }}>
          Testing data in console
        </button>
      </header>
      <footer className='footer'>
        <UsefulLinks />
      </footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  async function recapTaskFetchRequest(url, uid) {
    const res = await fetch(`${url}feedback?type=recap&uid=${uid}`);

    const data = await res.json();
    return data;
  }
  return serverSideProps(context, recapTaskFetchRequest);
}
