import YouTubePlayer from "solid-youtube";

export default () => (
  <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-2">
    <div class="">
      <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <YouTubePlayer
          videoId={() => "P95DuIBwnqw"}
          options={{
            height: "300",
            width: "100%",
          }}
        />
      </div>
      <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8 pointer-events-none">
        <h3>
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            Fusion
          </a>
        </h3>
        <p>$49</p>
      </div>
      <p class="mt-1 text-sm text-gray-500 pointer-events-none">UI Kit</p>
    </div>

    <div class="">
      <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <YouTubePlayer
          videoId={() => "njXeMeAu4Sg"}
          options={{
            height: "300",
            width: "100%",
          }}
        />
      </div>
      <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8 pointer-events-none">
        <h3>
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            Fusion
          </a>
        </h3>
        <p>$49</p>
      </div>
      <p class="mt-1 text-sm text-gray-500 pointer-events-none">UI Kit</p>
    </div>
  </div>
);
