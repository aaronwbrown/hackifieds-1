import Listings from './listings.jsx';
import ListingInfo from './listingInfo.jsx';
import Filter from './filter.jsx';
import helpers from '../lib/helpers.js';
import Nav from './nav.jsx';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      listings: [],
      navCategory: 'Rent',
      activeFilter: 'All',
      activeListing: null
    };
  }

  componentWillMount () {
    this.retrieveListings(this.state.navCategory);
  }

  retrieveListings (category) {
    helpers.getListings( category, data => {
      this.setState( {
        listings: data
      })
    });
  }

  sendListing () {
    helpers.postListing(this.state.navCategory);
    this.retrieveListings(this.state.navCategory);
  }

  handleNavClick(value) {
    this.setState({
      navCategory: value
    });
    this.retrieveListings(value);
  }
  
  handleListingEntryClick(event) {
    this.setState({
      activeListing: event.currentTarget.listingId
    });

    this.retrieveListings(this.state.navCategory);
    this.render();
  }

  render () {
    return (
      <div className='app'>
        <Nav handleNavClick={this.handleNavClick.bind(this)}/>
        <Listings handleListingEntryClick={this.handleListingEntryClick.bind(this)} 
                  activeListing={this.state.activeListing}
                  listings={this.state.listings}/>
        <Filter listings={this.state.listings}/>
        <button id="getButton" type="button" onClick={this.retrieveListings.bind(this)}>GET</button>
        <button id="postButton" type="button" onClick={this.sendListing.bind(this)}>POST</button>
      </div>
    );
  }

}

export default App;

