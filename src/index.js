import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { userService } from './services';
import { bicycleService } from './services';
import { orderService } from './services';
import { placeService } from './services';
import { Card, List, ListItem, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a user

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Sykkelutleie AS">
        <NavBar.Link to="/users">Users</NavBar.Link>
        <NavBar.Link to="/bicycles">Bicycles</NavBar.Link>
        <NavBar.Link to="/orders">Orders</NavBar.Link>
        <NavBar.Link to="/places">Places</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Velkommen til Hafjell Sykkelutleie AS</Card>;
  }
}

// START OF USER

class UserList extends Component {
  users = [];

  render() {
    return (
      <Card title="Users">
        <List>
          <NavLink to={'/newuser'}>New User</NavLink>
          <br />
          {this.users.map(user => (
            <List.Item key={user.id} to={'/users/' + user.id}>
              {user.firstname}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    userService.getUsers(users => {
      this.users = users;
    });
  }
}

class UserDetails extends Component {
  user = null;

  render() {
    if (!this.user) return null;

    return (
      <div>
        <Card title="User details">
          <Row>
            <Column width={2}>First name:</Column>
            <Column>{this.user.firstname}</Column>
          </Row>
          <Row>
            <Column width={2}>Last name:</Column>
            <Column>{this.user.lastname}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.user.email}</Column>
          </Row>

          <Row>
            <Column width={2}>telephone:</Column>
            <Column>{this.user.telephone}</Column>
          </Row>
          <Row>
            <Column width={2}>Birthday:</Column>
            <Column>{this.user.date}</Column>
          </Row>

          <Button.Light onClick={this.edit}>Edit</Button.Light>
        </Card>
      </div>
    );
  }

  mounted() {
    userService.getUser(this.props.match.params.id, user => {
      this.user = user;
    });
  }

  edit() {
    history.push('/users/' + this.user.id + '/edit');
  }
}

class UserEdit extends Component {
  user = null;

  render() {
    if (!this.user) return null;

    return (
      <div>
        <Card title="Edit user">
          <Form.Label>First name:</Form.Label>
          <Form.Input type="text" value={this.user.firstname} onChange={e => (this.user.firstname = e.target.value)} />
          <Form.Label>Last name:</Form.Label>
          <Form.Input type="text" value={this.user.lastname} onChange={e => (this.user.lastname = e.target.value)} />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.user.email} onChange={e => (this.user.email = e.target.value)} />
          <Form.Label>telephone:</Form.Label>
          <Form.Input type="text" value={this.user.telephone} onChange={e => (this.user.telephone = e.target.value)} />
          <Form.Label>Birthday:</Form.Label>
          <Form.Input type="text" value={this.user.date} onChange={e => (this.user.birthday = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    userService.getUser(this.props.match.params.id, user => {
      this.user = user;
    });
  }

  save() {
    userService.updateUser(this.user, () => {
      history.push('/users/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/users/' + this.props.match.params.id);
  }
}

class NewUser extends Component {
  firstname = '';
  lastname = '';
  email = '';
  telephone = '';
  birthday = '';

  render() {
    return (
      <div>
        <Card title="Edit user">
          <Form.Label>First name:</Form.Label>
          <Form.Input type="text" value={this.firstname} onChange={e => (this.firstname = e.target.value)} />
          <Form.Label>Last name:</Form.Label>
          <Form.Input type="text" value={this.lastname} onChange={e => (this.lastname = e.target.value)} />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.email} onChange={e => (this.email = e.target.value)} />
          <Form.Label>telephone:</Form.Label>
          <Form.Input type="number" value={this.telephone} onChange={e => (this.telephone = e.target.value)} />
          <Form.Label>Birthday:</Form.Label>
          <Form.Input type="date" value={this.birthday} onChange={e => (this.birthday = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  save() {
    userService.addUser(this.firstname, this.lastname, this.email, this.telephone, this.birthday, () => {
      history.push('/users');
    });
  }
}

// END OF USER

// START OF SYKLER

class BicycleList extends Component {
  bicycles = [];

  render() {
    return (
      <Card title="Bicycles">
        <List>
          <NavLink to={'/newbicycle'}>New Bicycle</NavLink>
          <br />
          {this.bicycles.map(bicycle => (
            <List.Item key={bicycle.id} to={'/bicycles/' + bicycle.id}>
              {bicycle.type}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    bicycleService.getBicycles(bicycles => {
      this.bicycles = bicycles;
    });
  }
}

class BicycleDetails extends Component {
  bicycle = null;

  render() {
    if (!this.bicycle) return null;

    return (
      <div>
        <Card title="Bicycle details">
          <Row>
            <Column width={2}>Bicycle ID:</Column>
            <Column>{this.bicycle.id}</Column>
          </Row>
          <Row>
            <Column width={2}>Bicycle Type:</Column>
            <Column>{this.bicycle.type}</Column>
          </Row>
          <Row>
            <Column width={2}>Bicycle Price:</Column>
            <Column>{this.bicycle.price}</Column>
          </Row>

          <Row>
            <Column width={2}>Bicycle Status:</Column>
            <Column>{this.bicycle.status}</Column>
          </Row>
          <Row>
            <Column width={2}>Service Message:</Column>
            <Column>{this.bicycle.servicemessage}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    bicycleService.getBicycle(this.props.match.params.id, bicycle => {
      this.bicycle = bicycle;
    });
  }

  edit() {
    history.push('/bicycles/' + this.bicycle.id + '/edit');
  }
}

class BicycleEdit extends Component {
  bicycle = null;

  render() {
    if (!this.bicycle) return null;

    return (
      <div>
        <Card title="Edit bicycle">
          <Form.Label>Bicycle Type:</Form.Label>
          <Form.Input type="text" value={this.bicycle.type} onChange={e => (this.bicycle.type = e.target.value)} />
          <Form.Label>Bicycle Price:</Form.Label>
          <Form.Input type="text" value={this.bicycle.price} onChange={e => (this.bicycle.price = e.target.value)} />
          <Form.Label>Bicycle Status:</Form.Label>
          <Form.Input type="text" value={this.bicycle.status} onChange={e => (this.bicycle.status = e.target.value)} />
          <Form.Label>Service Message:</Form.Label>
          <Form.Input
            type="text"
            value={this.bicycle.servicemessage}
            onChange={e => (this.bicycle.servicemessage = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    bicycleService.getBicycle(this.props.match.params.id, bicycle => {
      this.bicycle = bicycle;
    });
  }

  save() {
    bicycleService.updateBicycle(this.bicycle, () => {
      history.push('/bicycles/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/bicycles/' + this.props.match.params.id);
  }
}

class NewBicycle extends Component {
  id = '';
  type = '';
  price = '';
  status = '';
  servicemessage = '';

  render() {
    return (
      <div>
        <Card title="Add bicycle">
          <Form.Label>Bicycle Type:</Form.Label>
          <Form.Input type="text" value={this.type} onChange={event => (this.type = event.target.value)} />
          <Form.Label>Bicycle Price:</Form.Label>
          <Form.Input type="number" value={this.price} onChange={event => (this.price = event.target.value)} />
          <Form.Label>Bicycle Status:</Form.Label>
          <Form.Input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />
          <Form.Label>Service Message:</Form.Label>
          <Form.Input
            type="text"
            value={this.servicemessage}
            onChange={event => (this.servicemessage = event.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    bicycleService.getBicycles(bicycles => {
      this.bicycles = bicycles;
    });
  }

  save() {
    bicycleService.addBicycle(this.type, this.price, this.status, this.servicemessage, () => {
      history.push('/bicycles');
      history.push('/bicycles/' + this.props.match.params.id);
    });
  }
  cancel() {
    history.push('/bicycles/');
  }
}
// END OF SYKLER

// START OF ORDERS

class OrderList extends Component {
  orders = [];

  render() {
    return (
      <Card title="Orders">
        <List>
          <NavLink to={'/neworder'}>New Order</NavLink>
          <br />
          {this.orders.map(order => (
            <List.Item key={order.id} to={'/orders/' + order.id}>
              {order.id}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    orderService.getOrders(orders => {
      this.orders = orders;
    });
  }
}

class OrderDetails extends Component {
  order = null;

  render() {
    if (!this.order) return null;

    return (
      <div>
        <Card title="Order details">
          <Row>
            <Column width={2}>Order ID:</Column>
            <Column>{this.order.id}</Column>
          </Row>
          <Row>
            <Column width={2}>Order Type:</Column>
            <Column>{this.order.start}</Column>
          </Row>
          <Row>
            <Column width={2}>Order Price:</Column>
            <Column>{this.order.end}</Column>
          </Row>

          <Row>
            <Column width={2}>Order Status:</Column>
            <Column>{this.order.sum}</Column>
          </Row>
          <Row>
            <Column width={2}>Service Message:</Column>
            <Column>{this.order.status}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    orderService.getOrder(this.props.match.params.id, order => {
      this.order = order;
    });
  }

  edit() {
    history.push('/orders/' + this.order.id + '/edit');
  }
}

class OrderEdit extends Component {
  order = null;

  render() {
    if (!this.order) return null;

    return (
      <div>
        <Card title="Edit order">
          <Form.Label>Order Start:</Form.Label>
          <Form.Input type="date" value={this.order.start} onChange={e => (this.start = e.target.value)} />
          <Form.Label>Order End:</Form.Label>
          <Form.Input type="date" value={this.order.end} onChange={e => (this.end = e.target.value)} />
          <Form.Label>Order Sum:</Form.Label>
          <Form.Input type="text" value={this.order.sum} onChange={e => (this.sum = e.target.value)} />
          <Form.Label>Order Status:</Form.Label>
          <Form.Input type="text" value={this.order.status} onChange={e => (this.status = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    orderService.getOrder(this.props.match.params.id, order => {
      this.order = order;
    });
  }

  save() {
    orderService.updateOrder(this.order, () => {
      history.push('/orders/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/orders/' + this.props.match.params.id);
  }
}

class NewOrder extends Component {
  start = '';
  end = '';
  sum = '';
  status = '';

  render() {
    return (
      <div>
        <Card title="Add order">
          <Form.Label>Order Start:</Form.Label>
          <Form.Input type="date" value={this.start} onChange={event => (this.start = event.target.value)} />
          <Form.Label>Order End:</Form.Label>
          <Form.Input type="date" value={this.end} onChange={event => (this.end = event.target.value)} />
          <Form.Label>Order Sum:</Form.Label>
          <Form.Input type="text" value={this.sum} onChange={event => (this.sum = event.target.value)} />
          <Form.Label>Service Status:</Form.Label>
          <Form.Input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    orderService.getOrders(orders => {
      this.orders = orders;
    });
  }

  save() {
    orderService.addOrder(this.start, this.end, this.sum, this.status, () => {
      history.push('/orders');
      history.push('/orders/' + this.props.match.params.id);
    });
  }
  cancel() {
    history.push('/orders/');
  }
}
// END OF ORDERS

// START OF PLACES

class PlaceList extends Component {
  places = [];

  render() {
    return (
      <Card title="Places">
        <List>
          <NavLink to={'/newplace'}>New Place</NavLink>
          <br />
          {this.places.map(place => (
            <List.Item key={place.id} to={'/places/' + place.id}>
              {place.location}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    placeService.getPlaces(places => {
      this.places = places;
    });
  }
}

class PlaceDetails extends Component {
  place = null;

  render() {
    if (!this.place) return null;

    return (
      <div>
        <Card
          title="Place
       details"
        >
          <Row>
            <Column width={2}>Place ID:</Column>
            <Column>{this.place.id}</Column>
          </Row>
          <Row>
            <Column width={2}>Place Location:</Column>
            <Column>{this.place.location}</Column>
          </Row>
          <Row>
            <Column width={2}>Place Type:</Column>
            <Column>{this.place.type}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    placeService.getPlace(this.props.match.params.id, place => {
      this.place = place;
    });
  }

  edit() {
    history.push('/places/' + this.place.id + '/edit');
  }
}

class PlaceEdit extends Component {
  place = null;

  render() {
    if (!this.place) return null;

    return (
      <div>
        <Card title="Edit place">
          <Form.Label>Place Location:</Form.Label>
          <Form.Input type="text" value={this.place.location} onChange={e => (this.place.location = e.target.value)} />
          <Form.Label>Place Type:</Form.Label>
          <Form.Input type="text" value={this.place.type} onChange={e => (this.place.type = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    placeService.getPlace(this.props.match.params.id, place => {
      this.place = place;
    });
  }

  save() {
    placeService.updatePlace(this.place, () => {
      history.push('/places/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/places/' + this.props.match.params.id);
  }
}

class NewPlace extends Component {
  type = '';
  location = '';

  render() {
    return (
      <div>
        <Card title="Add place">
          <Form.Label>Place Location:</Form.Label>
          <Form.Input type="text" value={this.location} onChange={event => (this.location = event.target.value)} />
          <Form.Label>Place Type:</Form.Label>
          <Form.Input type="text" value={this.type} onChange={event => (this.type = event.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    placeService.getPlace;
    s(places => {
      this.places = places;
    });
  }

  save() {
    placeService.addPlace(this.location, this.type, () => {
      history.push('/places');
      history.push('/places/' + this.props.match.params.id);
    });
  }
  cancel() {
    history.push('/places/');
  }
}
// END OF PLACES

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={UserList} />
      <Route exact path="/users/:id" component={UserDetails} />
      <Route exact path="/users/:id/edit" component={UserEdit} />
      <Route exact path="/newuser" component={NewUser} />
      <Route exact path="/bicycles" component={BicycleList} />
      <Route exact path="/bicycles/:id" component={BicycleDetails} />
      <Route exact path="/bicycles/:id/edit" component={BicycleEdit} />
      <Route exact path="/newbicycle" component={NewBicycle} />
      <Route exact path="/orders" component={OrderList} />
      <Route exact path="/orders/:id" component={OrderDetails} />
      <Route exact path="/ordres/:id/edit" component={OrderEdit} />
      <Route exact path="/neworder" component={NewOrder} />
      <Route exact path="/places" component={PlaceList} />
      <Route exact path="/places/:id" component={PlaceDetails} />
      <Route exact path="/places/:id/edit" component={PlaceEdit} />
      <Route exact path="/newplace" component={NewPlace} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
