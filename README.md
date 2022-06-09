# Express Server Example

This example shows A simple Express project with Mongoose.

## Getting started

### 1. Install dependencies

Download this example:

```
npm install
```

### 2. Start the Express server

Launch your Express server with this command:

```
npm run dev
```

or 

```
npm run start
```

### 3. Routes
#### Reservations
You can use Reservations endpoints to create a new reservation, pay for the reservation or cancel the reservation.
* reservations/create
* reservations/pay
* reservations/list
* reservations/cancel

#### Rooms
You can use room endpoints to create a new room, update the room, or delete the room.
* rooms/create
* rooms/update
* rooms/delete
* rooms/list

#### payments
You can use Payment endpoints to get a list of payments.
* payments/list