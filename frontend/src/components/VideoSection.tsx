export function VideoSection() {
  return (
    <section className="w-full -mx-4 md:-mx-0">
      <div className="w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
          style={{ display: 'block' }}
        >
          <source src="/assets/575751c2-c8d9-492b-a08f-801ddc4e85f5.mov" type="video/quicktime" />
          <source src="/assets/575751c2-c8d9-492b-a08f-801ddc4e85f5-1.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
