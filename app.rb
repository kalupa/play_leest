require 'sinatra'

set :haml, format: :html5

get '/' do
  haml :index
end

get '/connected' do
  erb :callback
end
