<script>
    import {Router, Link, Route} from "svelte-routing";
    import AuthRoute from "./routes/AuthRoute.svelte";
    import HomeRoute from "./routes/HomeRoute.svelte";
    import MapRoute from "./routes/MapRoute.svelte";

    export let url = "";
</script>

<Router url="{url}">
    <nav>
        <Link to="/"><span>Home</span></Link>
        <Link to="auth"><span>Auth</span></Link>
        <Link to="map"><span>Map</span></Link>
    </nav>

    <div>
        <Route path="auth" component={AuthRoute} />
        <Route path="map" component={MapRoute} />
        <Route path="/" component={HomeRoute} />
    </div>
</Router>

<style>
    nav {
        position: absolute;
        top: 0;
        left: 0;
        background: #212121;
        z-index: 10;
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