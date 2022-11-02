<script>
    import { CodeInputStyle } from "../components/CodeInputStyle";
    import CodeInputComponent from "../components/CodeInputComponent.svelte";
    import PathTuningComponent from "../components/PathTuningComponent.svelte";
    import ChipGroup from "../components/ChipGroup.svelte";
    import Filter from "../components/Filter.svelte";
    
    export let location;

    let codeInputStyle = CodeInputStyle.NONE;

    function onCode(code) {
        if (code === "123456") {
            codeInputStyle = CodeInputStyle.CORRECT;
        } else {
            codeInputStyle = CodeInputStyle.WRONG;
        }
    }

</script>

<h1>Explore</h1>


<PathTuningComponent />


<CodeInputComponent bind:style={codeInputStyle} digits={6} on:code={(event) => onCode(event.detail.code)}/>

<Filter />