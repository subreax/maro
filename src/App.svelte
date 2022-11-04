<script>
    import {Router, Link, Route} from "svelte-routing";
    import SignInRoute from "./routes/SignInRoute.svelte";
    import SignUpRoute from "./routes/SignUpRoute.svelte";
    import ExploreRoute from "./routes/ExploreRoute.svelte";
    import ForgotPasswordPhoneRout from "./routes/ForgotPasswordPhoneRout.svelte";
    import ForgotPasswordAlertRout from "./routes/ForgotPasswordAlertRout.svelte";
    import ForgotPasswordRoute from "./routes/ForgotPasswordRoute.svelte";
    import MapRoute from "./routes/MapRoute.svelte";
    import NewPasswordRoute from "./routes/NewPasswordRoute.svelte";

    export let url = "";
</script>

<Router url="{url}">
    <nav>
        <Link to="/"><span>Explore</span></Link>
        <Link to="signin"><span>SignIn</span></Link>
        <Link to="signup"><span>SignUp</span></Link>
        <Link to="forgot-password"><span>ForgotPassword</span></Link>
        <Link to="forgot-password-alert"><span>ForgotPasswordAlert</span></Link>
        <Link to="forgot-password-phone"><span>ForgotPasswordPhone</span></Link>
        <Link to="new-password"><span>NewPassword</span></Link>
        <Link to="map"><span>Map</span></Link>
    </nav>

    <div>
        <Route path="/" component={ExploreRoute} />
        <Route path="signin" component={SignInRoute} />
        <Route path="signup" component={SignUpRoute} />
        <Route path="forgot-password" component={ForgotPasswordRoute} />
        <Route path="forgot-password-alert" component={ForgotPasswordAlertRout} />
        <Route path="forgot-password-phone" component={ForgotPasswordPhoneRout} />
        <Route path="new-password" component={NewPasswordRoute} />
        <Route path="map" component={MapRoute} />
    </div>
</Router>

<style>
    nav {
        background: #212121;
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
</style>