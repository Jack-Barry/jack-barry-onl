<script lang="ts">
  import AccordionItem from '$lib/components/bootstrap/AccordionItem.svelte';
  import Image from '$lib/components/content/Image.svelte';

  const accordionId = 'aboutMeAccordion';
</script>

<h2>About me</h2>
<div class="accordion mb-5" id={accordionId}>
  <AccordionItem parentId={accordionId} id="accordion-item-career" title="Career">
    <p>
      Throughout 2023, I lead the charge to transition several projects away from Create React App
      over to Vite to speed up dev/build times and generally improve developer experience. I also
      moved a large test suite off of Cypress in favor of Playwright for similar reasons. These two
      major overhauls cut build and test times by at least 50%, reducing our used CI minutes on
      GitHub and overall positioning us to build more reliable systems. I also spent much of this
      year building out a common library of components based on our design team's specs,
      implementing a design system that can be reused by several different teams throughout the
      organization. The library customizes and extends Bootstrap and provides flexible React
      components to increase the speed at which teams can deliver UIs that comply with design
      standards.
    </p>
    <p>
      In my spare time, I dipped my toes into learning my first compiled language, Rust, and have
      learned quite a bit from the experience, taking what I learned and keeping it in mind when
      writing in other languages in regard to performance, mutability, etc. Svelte has also been a
      technology I decided to start learning, and so far I am pretty happy with it (my personal site
      recently went through it's 3rd rewrite from begin based on Next.JS to SvelteKit).
    </p>
    <p>
      In 2021, I moved from being a Senior QA Automation Engineer into an official Software Engineer
      role. From 2021 to 2022, I drank from the firehose, learning all about React, AWS, and
      building resilient architectures that scale. I built a microservice in Node using the
      Serverless framework, learning some of AWS's managed services along the way (such as Lambda,
      SQS, EventBridge, OpenSearch, DynamoDB, AppSync, and more). I also built developer tools to
      make our CI and release processes more standardized and less error prone, working on GitHub
      Actions and Azure DevOps configs to get all of our pipelines smoothed out.
    </p>
    <p>
      For the time I was a Senior QA Automation Engineer, between 2019 and 2021, I built an Electron
      app called Copilot to help QA and other staff more easily update our kiosk software for
      testing and demos. The app was built with TypeScript, Vue and packaged and published via Azure
      DevOps pipelines. I also implemented a custom testing framework that utilized Prisma with a
      Postgres database, deployed in Azure.
    </p>
    <p>
      When I first joined Flash as a QA Engineer, I was hesitant to go from being a Web Developer to
      a QA role, but they provided me a lot of opportunity to grow and I had a lot of fun during
      those first couple of years, even if a lot of it was spent on manual QA instead of dev work.
      In spare time, they let me start tinkering on the first iteration of the \"Copilot\" app. My
      first naive implementation was a hodge-podge of a locally running Python Flask API with a
      Vue-based frontend. Toward the end of the first pass at it, I discovered Electron which led to
      the rewrite.
    </p>
    <p>
      Between 2017 and 2018, I entered the world of development at a small marketing firm who took a
      chance on me as a self-taught programmer. I'm grateful for this time, as I got my hands dirty
      in a wide variety of tech stacks. I built an incentive tracking app in Ruby on Rails, and
      learned some of the basics of web apps. During this time I learned how to manage sites built
      on WordPress, Magento, Shopify, and various other platforms, including custom PHP sites.
    </p>
    <p>
      Prior to my grown-up real career, I worked in the plasma industry as a QA Specialist for a
      couple of years, dipping my toes into programming by building increasingly more complex Excel
      spreadsheets to track work for the QA department. I also got in some time as an IT tech toward
      the tail end of my time in plasma. Before that I was a bank teller for a while, and during my
      time in college I also worked as a machinist at a small shop, learning how to program CNC
      mills/lathes.
    </p>
    <p>
      It's been an interesting journey so far, not bad for a guy with a degree he's not actually
      using (Bachelor's of Science in Biology, Ecology Evolution and Behavior).
    </p>
  </AccordionItem>
  <AccordionItem
    parentId={accordionId}
    id="accordion-item-personal"
    title="Personal"
    bodyClass="pb-1"
  >
    <p>
      I live in El Paso, Texas with a wonderful family. My wife Carolina is an amazing mother to our
      two kids. Penelope and Lukas are two incredibly smart and energetic youngsters who make me
      laugh every day. Our dog Rilo is, as Penny would say "super cyoot."
    </p>
    <p>
      I'm a Christian, but before you write me off as some Bible thumping hard-right winger (my
      ballot history would testify otherwise and no I am not a fan of the orange haired guy), maybe
      we could have a conversation and get to know each other a bit.
    </p>
    <p>
      I love music, whether playing or listening. Some of my favorite bands are The Allman Brothers
      Band, The Black Keys, Band of Horses, MGMT, etc., mostly rock, indie, and some psychedelic and
      pop music. I also enjoy running and riding my bicycle around the neighborhood.
    </p>
    <p>
      Feel free to reach out to me on any of the social medias as long as you're not some wacko.
      Cheers
    </p>
    <Image
      src="/images/home/about_me_family.jpg"
      alt="Jack Barry with his wife, two kids, and dog"
    />
  </AccordionItem>
</div>
