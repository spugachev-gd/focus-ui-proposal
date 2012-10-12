watch('haml.*/([^/]+\.haml)'){
  |md|
  cmd = "haml #{md[0]} #{md[1].gsub(/\.haml$/, '.html')}"
  puts cmd
  system(cmd)
}
