import { useEffect, useState } from "react";
import initializeAuthentication from "../../firebase/firebase.init";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, GithubAuthProvider, signOut,
    createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";


const useFirebase = () => {
    initializeAuthentication();
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userEmail, setUserEmail] = useState('');



    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(result => setProducts(result))
    }, [])
    useEffect(() => {
        fetch('./blogs.json')
            .then(response => response.json())
            .then(result => setBlogs(result))
    }, [])


    const blogsForHome = [];
    for (let i = 0; i < 3; i++) {
        blogsForHome.push(blogs[i])
    }


    //SIGN IN METHODS HERE :
    const auth = getAuth();


    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // sign in with google
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user)

            }).catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    // Observer :
    onAuthStateChanged(auth, user => {
        if (user) {
            setUser(user)
        } else {

        }
    })
    // sign in with github :
    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                setUser(user)
            }).catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    // log out :
    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            }).catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    const getUserName = e => {
        const userName = e.target.value;
        setUserName(userName)

    }
    const getUserEmail = e => {
        const userEmail = e.target.value;
        setUserEmail(userEmail)
    }
    const getUserPassword = e => {
        const userPassword2 = e.target.value;
        if (!/(?=.*[A-Z].*[A-Z])/.test(userPassword2)) {

            setUserPassword(''); // previous password reset
            return setPasswordError('Ensure password has two uppercase letters.')
        }
        if (!/(?=.*[0-9].*[0-9])/.test(userPassword2)) {

            setUserPassword(''); // previous password reset
            return setPasswordError('Ensure password has two digits.')
        }
        if (!/.{8}/.test(userPassword2)) {

            setUserPassword(''); // previous password reset
            return setPasswordError('Ensure password is of length 8.')
        }
        setUserPassword(userPassword2)
        setPasswordError('')
    }
    const getUserConfirmPassword = e => {
        const confirmPassword = e.target.value;
        setUserConfirmPassword(confirmPassword)
    }
    const handleSignIn = e => {
        e.preventDefault()
        if (userPassword !== userConfirmPassword) {
            return setError('Please match your password')
        }
        if (userName.length < 4) {
            return setError('Please write your full name')
        }

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(result => {


                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {

                }).catch(error => {

                })
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setUserName('');
                        setUserEmail('');
                        setUserPassword('')
                        setError('');
                        setUserConfirmPassword('')
                    })

            })
            .catch(error => {
                const errorMessage = error.message;
                const exist = errorMessage.slice(24, 42);
                const invalid = errorMessage.slice(22, 35);

                if (exist === 'ail-already-in-use') {
                    return setError("Email already in use")
                }
                if (invalid === "invalid-email") {
                    return setError('Please write valid email')
                }
            })
    }
    const handleLogin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(result => {
            }).catch(error => {
                const errorMessage = error.message;
                const notFound = errorMessage.slice(22, 36);
                const wrongPassword = errorMessage.slice(22, 36);
                const invalid = errorMessage.slice(22, 35);
                if (notFound === "user-not-found") {
                    return setError("User not found")
                }
                if (invalid === "invalid-email") {
                    return setError("Write valid email address")
                }
                if (wrongPassword === "wrong-password") {
                    return setError('Wrong password')
                }
                console.log(wrongPassword)
            })
    }
    const forgetPassword = () => {
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                setError("Send reset password email")
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    // increase quantity 

    const addToDb = (quantity, productName) => {
        alert(`${quantity} items ${productName} added successfully. Thank You!`)
    }

    return {
        products,
        blogsForHome,
        signInWithGoogle,
        signInWithGithub,
        user,
        logOut,
        getUserConfirmPassword,
        getUserName,
        getUserEmail,
        getUserPassword,
        passwordError,
        handleSignIn,
        error,
        handleLogin,
        addToDb,
        blogs,
        forgetPassword
    }
}
export default useFirebase;