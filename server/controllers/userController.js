const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_project',
  connectionLimit: 10 //maximum 10 parallel connection
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM resident', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

// View Bookings
exports.booking = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM booking', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedBooking = req.query.removed;
      res.render('booking', { rows, removedBooking });
    } else {
      console.log(err);
    }
    console.log('The data from booking table: \n', rows);
  });
}

// View Branch
exports.branch = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM branch', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedBranch = req.query.removed;
      res.render('branch', { rows, removedBranch });
    } else {
      console.log(err);
    }
    console.log('The data from branch table: \n', rows);
  });
}

// View invoice
exports.staff = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM staff', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedStaff = req.query.removed;
      res.render('staff', { rows, removedStaff });
    } else {
      console.log(err);
    }
    console.log('The data from staff table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM resident WHERE Name LIKE ? OR BookingID LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

exports.addBookingForm = (req, res) => {
  res.render('add-booking');
}

exports.addStaffForm = (req, res) => {
  res.render('add-staff');
}

exports.addBranchForm = (req, res) => {
  res.render('add-branch');
}

// Add new resident
exports.create = (req, res) => {
  console.log('req.body', req.body);
  const { ResidentID, BookingHistory, PaymentInformation, Contact, Name, PlanID, BookingID } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO resident SET ResidentID = ?, BookingHistory = ?, PaymentInformation = ?, Contact = ?, Name = ?, PlanID = ?, BookingID = ?',
    [Math.floor(Math.random() * 2000), BookingHistory, PaymentInformation, Contact, Name, PlanID, BookingID], (err, rows) => {
      if (!err) {
        res.render('add-user', { alert: 'Resident added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from resident table: \n', rows);
    });
}


// Edit user
exports.edit = (req, res) => {
  console.log('check ', req.params);
  // User the connection
  connection.query('SELECT * FROM resident WHERE ResidentID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from edit resident table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { ResidentID, BookingHistory, PaymentInformation, Contact, Name, PlanID, BookingID } = req.body;
  // User the connection
  connection.query('UPDATE resident SET ResidentID = ?, BookingHistory = ?, PaymentInformation = ?, Contact = ?, Name = ?, PlanID = ?, BookingID = ? WHERE ResidentID = ?', [req.params.id, BookingHistory, PaymentInformation, Contact, Name, PlanID, BookingID, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      console.log("idsssss", req.params);
      connection.query('SELECT * FROM resident WHERE ResidentID = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it

        if (!err) {
          res.render('edit-user', { rows, alert: `${Name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from resident table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  connection.query('DELETE FROM resident WHERE ResidentID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('Resident successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM resident WHERE id = ?', [req.params.ResidentID], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from resident table: \n', rows);
  });

}