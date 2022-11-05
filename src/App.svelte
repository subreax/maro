<script>
    import {Router, Link, Route} from "svelte-routing";
    import SignInRoute from "./routes/SignInRoute.svelte";
    import SignUpRoute from "./routes/SignUpRoute.svelte";
    import ExploreRoute from "./routes/ExploreRoute.svelte";
    import ForgotPasswordPhoneRout from "./routes/ForgotPasswordPhoneRout.svelte";
    import ForgotPasswordRoute from "./routes/ForgotPasswordRoute.svelte";
    import MapRoute from "./routes/MapRoute.svelte";
    import NewPasswordRoute from "./routes/NewPasswordRoute.svelte";
    import ConfirmRoute from "./routes/ConfirmRoute.svelte";

    export let url = "";
</script>

<Router url="{url}">
    <!-- <nav>
        <Link to="/"><span>Explore</span></Link>
        <Link to="signin"><span>SignIn</span></Link>
        <Link to="signup"><span>SignUp</span></Link>
        <Link to="reset-password"><span>ForgotPassword</span></Link>
        <Link to="reset-password-phone"><span>ForgotPasswordPhone</span></Link>
        <Link to="new-password"><span>NewPassword</span></Link>
        <Link to="map"><span>Map</span></Link>
    </nav> -->

    <div>
        <Route path="/" component={ExploreRoute} />
        <Route path="signin" component={SignInRoute} />
        <Route path="signup" component={SignUpRoute} />
        <Route path="confirm" component={ConfirmRoute} />
        <Route path="reset-password" component={ForgotPasswordRoute} />
        <Route path="reset-password-phone" component={ForgotPasswordPhoneRout} />
        <Route path="new-password" component={NewPasswordRoute} />
        <Route path="map" component={MapRoute} />
    </div>
</Router>

<style>
    nav {
        background: #2121217f;
        z-index: 100;
        position: relative;
    }

    span {
        display: inline-block;
        padding: 8px;
        color: #fafafa;
    }

    span:hover {
        color: #ff9800;
    }

    .route-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>