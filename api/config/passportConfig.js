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
			usernameField: "username",
			passwordField: "password",
			session: false
		},
		(username, password, done) => {
			bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS), (err, salt) => {
				if (err) console.log("Error generating salt in passportConfig.js", err);
				bcrypt.hash(password, salt, (err, hashedPassword) => {
					if (err) console.log("Error generating hash in passportConfig.js", err);
					// note the return needed with passport local - remove this return for passport JWT to work
					return done(null, hashedPassword);
				});
			});
		}
	)
);

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			session: false
		},
		(username, password, done) => {
			try {
				User.findOne({
					where: {
						username: username
					}
				}).then((user) => {
					if (user === null) {
						return done(null, false, { message: "bad username" });
					} else {
						bcrypt.compare(password, user.password).then((response) => {
							if (response !== true) {
								console.log("passwords do not match");
								return done(null, false, { message: "passwords do not match" });
							}
							console.log("user found & authenticated");
							// note the return needed with passport local - remove this return for passport JWT
							return done(null, user);
						});
					}
				});
			} catch (err) {
				done(err);
			}
		}
	)
);

const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
	secretOrKey: process.env.JWT_SECRET
};

passport.use(
	"jwt",
	new JWTstrategy(opts, (jwt_payload, done) => {
		try {
			User.findOne({
				where: {
					username: jwt_payload.id
				}
			}).then((user) => {
				if (user) {
					console.log("user found in db in passport");
					// note the return removed with passport JWT - add this return for passport local
					done(null, user);
				} else {
					console.log("user not found in db");
					done(null, false);
				}
			});
		} catch (err) {
			done(err);
		}
	})
);
