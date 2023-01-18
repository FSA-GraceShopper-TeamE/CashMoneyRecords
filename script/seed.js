const axios = require("axios");
const { faker } = require("@faker-js/faker");

const {
  db,
  models: { Album, Order, OrderAlbum, User },
} = require("../server/db");

const userID = "c2c9e5f29cc4a9299ea289ee2d0ef9b2";
const configure = {
  headers: {
    ["User-Agent"]: "grace-shopper/2023",
    ["Content-Type"]: "application/x-www-form-urlencoded",
  },
};
const artists = 40;
const albums = 5;
const users = 30;

const albumPrices = [10.55, 14.99, 16.25, 18.33, 20.99, 25.75];
const albumGenres = [
  "Jazz",
  "Techno",
  "Reggae",
  "Alternative",
  "Instrumental",
  "Hip Hop",
];

async function seed() {
  await db.sync({ force: true });
  console.log("db in process of syncing");

  const topArtistsURL = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${userID}&format=json`;
  const artistData = await axios.get(topArtistsURL, configure);

  const top40Artists = artistData.data.artists.artist
    .slice(0, artists)
    .map((artist) => artist.name);

  for (const artist of top40Artists) {
    const artistAlbumsURL = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${userID}&format=json`;
    const artistAlbumsData = await axios.get(artistAlbumsURL, configure);

    const top5Albums = artistAlbumsData.data.topalbums.album
      .splice(0, albums)
      .map((album) => album.name);

    for (const albumTitle of top5Albums) {
     
      const albumURL = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${userID}&artist=${artist}&album=${albumTitle}&format=json`;
      const { data } = await axios.get(albumURL, configure);
      const { album } = data;

      const tracksData =
        album.tracks && album.tracks.track.length ? album.tracks.track : 0;

      const tags = album.tags && album.tags.tag.length > 2 ? album.tags.tag : 0;

      if (album && tracksData && tags && album.wiki) {
        
        const artistName = album.artist;
        const title = album.name;
        const tracks = tracksData.map((track) => track.name);
        const description = album.wiki.summary;
        const image = album.image[3]["#text"];
        const genre = albumGenres[Math.floor(Math.random() * 6)];
        const price = albumPrices[Math.floor(Math.random() * 6)];
        const quantity = Math.floor(Math.random() * 50);
        
        await Album.create({
          artistName,
          title,
          tracks,
          description,
          image,
          genre,
          price,
          quantity,
        });
      }
    }
  }
  // Creating Users
  for (let i = 0; i < users; i += 1) {
    const user = {};
    user.email = faker.internet.email();
    user.password = faker.lorem.word(12);
    user.address =
      faker.address.streetAddress() +
      " " +
      faker.address.city() +
      " " +
      faker.address.country();
    user.isAdmin = false;
    await User.create(user);
  }
  // Create Admin User
  const admin = {};
  admin.email = "admin@gmail.com";
  admin.password = "password";
  admin.address =
    faker.address.streetAddress() +
    " " +
    faker.address.city() +
    " " +
    faker.address.country();
  admin.isAdmin = true;
  await User.create(admin);

  // Creating Orders
  for (let i = 1; i < 32; i++) {
    const order = {};
    order.shippingInfo =
      faker.address.streetAddress() +
      " " +
      faker.address.city() +
      " " +
      faker.address.country();
    order.billingInfo =
      faker.address.streetAddress() +
      " " +
      faker.address.city() +
      " " +
      faker.address.country();
    order.completed = Math.random() > 0.5 ? true : false;
    order.userId = i;
    await Order.create(order);
  }
  // Order Items
  for (let i = 0; i < 100; i++) {
    const orderAlbums = {};
    orderAlbums.price = albumPrices[Math.floor(Math.random() * 6)];
    orderAlbums.quantity = Math.ceil(Math.random() * 3);
    orderAlbums.albumId = Math.ceil(Math.random() * 30);
    orderAlbums.orderId = Math.ceil(Math.random() * users);
    await OrderAlbum.create(orderAlbums);
  }

  for (let i = 0; i < 5; i += 1) {
    const orderAlbums = {};
    orderAlbums.price = albumPrices[Math.floor(Math.random() * 6)];
    orderAlbums.quantity = Math.ceil(Math.random() * 3);
    orderAlbums.albumId = Math.ceil(Math.random() * 30);
    orderAlbums.orderId = 31;
    await OrderAlbum.create(orderAlbums);
  }
  console.log(`db seeded successfully!`);
}

async function runSeed() {
  console.log("seeding");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection has been closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
