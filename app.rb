require 'sinatra'
require 'haml'

set :haml, format: :html5

get '/' do
  @client_id = ENV['SC_CLIENT_ID']
  haml :index
end

get '/connected' do
  erb :callback
end
