<script>
    import CodeInputComponent from "../components/CodeInputComponent.svelte";
    import PathTuningComponent from "../components/PathTuningComponent.svelte";
    
    export let location;
</script>

<h1>Explore</h1>


<PathTuningComponent />


<CodeInputComponent digits={6} />
