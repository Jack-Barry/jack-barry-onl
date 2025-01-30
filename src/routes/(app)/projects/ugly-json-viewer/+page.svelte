<script lang="ts">
  import CodeSnippet from '$lib/components/content/codeSnippets/CodeSnippet.svelte';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { BY_JACK_BARRY } from '$lib/utils/constants';

  const defaultUglyJson = JSON.stringify({
    example: {
      nested: JSON.stringify({
        deeply: {
          nested: JSON.stringify({ even: 'deeplier' })
        }
      })
    }
  });
  const defaultIndentSize = 4;

  let uglyJson = $state(defaultUglyJson);
  let prettyJsonIndentSize = $state(defaultIndentSize);
  let prettyJson = $derived(JSON.stringify(deepParse(uglyJson), null, prettyJsonIndentSize));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function deepParse(json: any) {
    let parsed = json;

    if (typeof json === 'string') {
      try {
        parsed = JSON.parse(json);
      } catch {
        // nothing to do if it can't be parsed
      }
    }

    if (typeof parsed === 'object') {
      Object.entries(parsed).forEach(([key, value]) => {
        parsed[key] = deepParse(value);
      });
    }

    return parsed;
  }

  function reset() {
    uglyJson = defaultUglyJson;
    prettyJsonIndentSize = 4;
  }
</script>

<HeadMetadata
  siteTitle="Projects: Ugly JSON Viewer"
  ogImageTitle="Ugly JSON Viewer"
  ogImageSubtitle={BY_JACK_BARRY}
  description="A lightweight utility for prettifying stringified JSON. It helps in particular with JSON that has nested stringified JSON in it, like when you're reading CloudWatch Logs for SQS messages and things of that sort."
/>

<h1>Ugly JSON Viewer</h1>
<div class="d-flex flex-column gap-3">
  <div>
    <label for="uglyJson" class="form-label">Ugly JSON Goes Here</label>
    <textarea bind:value={uglyJson} class="form-control font-monospace" id="uglyJson" rows="5">
    </textarea>
  </div>
  <div>
    <label for="prettyJsonIndentSize" class="form-label">Indent Size</label>
    <input
      bind:value={prettyJsonIndentSize}
      class="form-control"
      id="prettyJsonIndentSize"
      type="number"
    />
  </div>
  <div>
    <h2>Output</h2>
    <CodeSnippet code={prettyJson} lang="json" />
    <div class="d-flex justify-content-end">
      <button onclick={reset} type="button" class="btn btn-primary">Reset</button>
    </div>
  </div>
</div>
