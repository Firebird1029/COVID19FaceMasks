const passport = require("passport"),
	localStrategy = require("passport-local").Strategy,
	JWTstrategy = require("passport-jwt").Strategy,
	ExtractJWT = require("passport-jwt").ExtractJwt,
	bcrypt = require("bcrypt"),
	User = require("../models/UserModel.js");

// https://stackoverflow.com/questions/19948816/passport-js-error-failed-to-serialize-user-into-session
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	"register",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			session: false,
			passReqToCallback: true
		},
		(req, email, password, done) => {
			bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS), (err, salt) => {
				if (err) console.log("Error generating salt in passportConfig.js", err);
				bcrypt.hash(password, salt, (err, hashedPassword) => {
					if (err) console.log("Error generating hash in passportConfig.js", err);

					User.create({
						email: email,
						password: hashedPassword,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						phone: req.body.phone
					})
						.then((user) => {
							// note the return needed with passport local - remove this return for passport JWT to work
							return done(null, user);
						})
						.catch((err) => console.log("Error in User.create in passportConfig.js", err));
				});
			});
		}
	)
);

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			session: false
		},
		(email, password, done) => {
			User.findOne({ email })
				.then((user) => {
					if (!user) {
						return done({ message: "User not found." }, false);
					} else {
						bcrypt
							.compare(password, user.password)
							.then((response) => {
								if (!response) {
									return done({ message: "Password incorrect." }, false);
								}

								// note the return needed with passport local - remove this return for passport JWT
								return done(null, user);
							})
							.catch((err) =>
								console.log("Error in bcrypt.compare in login method in passportConfig.js", err)
							);
					}
				})
				.catch((err) => console.log("Error in User.findOne in login method in passportConfig.js", err));
		}
	)
);

const opts = {
	// jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
};

passport.use(
	"jwt",
	new JWTstrategy(opts, (jwt_payload, done) => {
		User.findOne({ email: jwt_payload.id })
			.then((user) => {
				if (user) {
					// note the return removed with passport JWT - add this return for passport local
					done(null, user);
				} else {
					done({ message: "User not found" }, false);
				}
			})
			.catch((err) => console.log("Error in User.findOne in jwt method in passportConfig.js", err));
	})
);
