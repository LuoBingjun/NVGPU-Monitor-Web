import cherrypy
import os
import json

from nvml import init_nvml, get_gpus_info, shutdown_nvml

class WebService(object):
    @cherrypy.expose
    def index(self):
        return open('./webui/dist/index.html')

@cherrypy.expose
class ApiService(object):
    @cherrypy.tools.json_out()
    def GET(self):
        init_nvml()
        data = get_gpus_info()
        shutdown_nvml()
        return data

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self, gpus=None, memory=True, process=True, power=True):
        init_nvml()
        data = get_gpus_info(gpus=gpus, memory=memory, process=process, power=power)
        shutdown_nvml()
        return data

if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/api': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        },
        '/assets': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './webui/dist/assets'
        }
    }
    webapp = WebService()
    webapp.api = ApiService()
    cherrypy.config.update('server.conf')
    cherrypy.quickstart(webapp, '/', conf)