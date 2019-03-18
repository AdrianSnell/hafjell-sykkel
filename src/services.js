import { connection } from './mysql_connection';

class UserService {
  getUsers(success) {
    connection.query('select * from Users', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getUser(id, success) {
    connection.query('select * from Users where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateUser(user, success) {
    connection.query(
      'update Users set firstname=?, lastname=?,email=?, telephone=?, birthday=? where id=?',
      [user.firstname, user.lastname, user.email, user.telephone, user.birthday, user.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addUser(firstname, lastname,email, telephone, birthday) {
    connection.query(
      'insert into Users set firstname=?,lastname= ?,email=?,telephone=?,birthday=?',
      [firstname, lastname, email, telephone, birthday],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}
export let userService = new UserService();



class OrderService {
  getOrders(success) {
    connection.query('select * from Orders', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getOrder(id, success) {
    connection.query('select * from Orders where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateOrder(order, success) {
    connection.query(
      'update Orders set start=?, end=?, sum=?, status=? where id=?',
      [order.start, order.end, order.sum, order.status, order.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addOrder(start, end,sum, status, id) {
    connection.query(
      'insert into Orders set start=?,end=?,sum=?,status=?',
      [start, end, sum, status],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}
export let orderService = new OrderService();

class BicycleService {
  getBicycles(success) {
    connection.query('select * from Bicycles', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBicycle(id, success) {
    connection.query('select * from Bicycles where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateBicycle(bicycle, success) {
    connection.query(
      'update Bicycles set type=?, price=?, status=?, servicemessage=? where id=?',
      [bicycle.type, bicycle.price, bicycle.status, bicycle.servicemessage, bicycle.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addBicycle(type, price, status, servicemessage) {
    connection.query(
      'insert into Bicycles set type=?, price=?, status=?, servicemessage=?',
      [type, price, status, servicemessage],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}
export let bicycleService = new BicycleService();

class PlaceService {
  getPlaces(success) {
    connection.query('select * from Places', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getPlace(id, success) {
    connection.query('select * from Places where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updatePlace(place, success) {
    connection.query(
      'update Places set location=?, type=? where id=?',
      [place.location, place.type, place.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addPlace(location, type) {
    connection.query(
      'insert into Places set location=?, type=?',
      [type, price, status, servicemessage],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}
export let placeService = new PlaceService();
