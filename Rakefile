require "rubygems"
require 'rake'

desc "Remove _site from directory before committing"
task :clean do
  system "rm -rf _site"
end # task :clean

desc "Download JS files"
task :js do
  FileUtils.mkdir_p "js/vendor"
  File.open("_includes/_js_includes.html","w") do |file|
    {
      "jQuery" => {
        url: "http://code.jquery.com/jquery-2.0.3.min.js" 
      },
    }.each do |library,options|
        puts "Downloading #{library}..."
        url = options.fetch(:url)
        filename = options.fetch(:filename) { url.split(/\//).last }
        `curl '#{url}' > js/vendor/#{filename}`
        file.puts "<script src='js/vendor/#{filename}'></script>"
        if options[:init]
          file.puts "<script>#{options[:init]}</script>"
        end
      end
    Dir["js/*.js"].each do |js|
      file.puts "<script src='#{js}'></script>"
    end
  end
end

task :default do
  abort "use foreman start to run the project"
end
